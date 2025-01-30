import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { StorageService } from '../../services/storage.service';


declare var bootstrap: any;

@Component({
  selector: 'app-level2',
  imports: [CommonModule],
  templateUrl: './level2.component.html',
  styleUrl: './level2.component.css'
})
export class Level2Component implements OnInit, OnDestroy {
  activityId: string = 'actividad2';

  elapsedTime: number = 0;
  formattedTime = '00:00:00';
  timer: any;
  time: number = 0;
  isTimerStarted = false;

  errorMessage: string | null = null;

  message = '';
  correctSelection = false;
  selectedCorrectCards = 0;

  alerts: { [key: number]: { type: 'info' | 'warning' } | null } = {};
  correctCards = new Set<number>();
  allCorrectSelected = false;

  score: number = 0;
  completedMessage: string | null = null;
  completed: boolean = false;
  saved: boolean = false;

  private videoPlayer: HTMLIFrameElement | null = null;
  private modalElement: HTMLElement | null = null;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private storageService: StorageService) { }

  ngOnInit(): void {
    // this.restartAll();

    const state = this.storageService.getActivityState()[this.activityId];
    if (state) {
      this.score = state.score;
      this.time = state.time;
      this.formattedTime = state.formattedTime;
      this.completed = state.completed;
      this.saved = state.saved;
    }
    console.log(this.completed)

    this.showOffCanvas();
  }

  ngOnDestroy(): void {
    // this.stopTimer();
  }

  showOffCanvas() {
    const offCanvasElement = document.getElementById('offcanvasScrolling');
    const offCanvas = new bootstrap.Offcanvas(offCanvasElement);
    if (!this.saved) {
      offCanvas.show();
      
    }
  }

  toggleOffCanvas() {
    const offCanvasElement = document.getElementById('offcanvasScrolling');
    const offCanvas = new bootstrap.Offcanvas(offCanvasElement);
    offCanvas.toggle();
  }

  startTimer() {
    this.isTimerStarted = true;
    this.timer = setInterval(() => {
      this.elapsedTime++;
      this.updateFormattedTime();
    }, 1000);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateFormattedTime() {
    const hours = Math.floor(this.elapsedTime / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((this.elapsedTime % 3600) / 60).toString().padStart(2, '0');
    const seconds = (this.elapsedTime % 60).toString().padStart(2, '0');
    this.formattedTime = `${hours}:${minutes}:${seconds}`;
  }

  handleCardClick(cardId: number, type: 'info' | 'warning') {
    if (type === 'info') {
      this.correctCards.add(cardId);
      this.alerts[cardId] = { type: 'info' };
    } else if (type === 'warning') {
      this.correctCards.delete(cardId);
      this.alerts[cardId] = { type: 'warning' };

      // Hide the warning alert after 5 seconds
      setTimeout(() => {
        this.alerts[cardId] = null;
      }, 5000);
    }

    this.checkCompletion();

    if (this.allCorrectSelected) {
      this.stopTimer();
      this.showModalCompleted();
    }
  }

  checkCompletion() {
    // Check if cards 1, 3, 4 (correct ones) are selected
    if (this.correctCards.has(1) && this.correctCards.has(3) && this.correctCards.has(4) && !this.correctCards.has(2) && !this.correctCards.has(5)) {
      this.allCorrectSelected = true;
    } else {
      this.allCorrectSelected = false;
    }
  }

  showModalCompleted(): void {
    this.completed = true;
    // Calcular puntuación antes de mostrar el modal
    const tiempoEnMinutos = this.elapsedTime / 60; // Convertir ms a minutos

    if (tiempoEnMinutos <= 3) {
      this.score = 10;
    } else if (tiempoEnMinutos <= 4) {
      this.score = 9;
    } else if (tiempoEnMinutos <= 5) {
      this.score = 8;
    } else if (tiempoEnMinutos <= 6) {
      this.score = 7;
    } else if (tiempoEnMinutos <= 7) {
      this.score = 6;
    } else if (tiempoEnMinutos <= 8) {
      this.score = 5;
    } else {
      this.score = 4;
    }

    const modalElement = document.getElementById('completedModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  abrirModalVideo() {
    // Obtén el elemento del modal
    const modalElement = document.getElementById('videoModal');
    if (modalElement) {
      // Inicializa y muestra el modal
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  ngAfterViewInit(): void {
    // Encuentra el modal y el iframe usando ElementRef
    this.modalElement = this.elementRef.nativeElement.querySelector('#videoModal');
    this.videoPlayer = this.elementRef.nativeElement.querySelector('#videoPlayer');

    if (this.modalElement) {
      // Escucha el evento 'hidden.bs.modal' de Bootstrap
      this.renderer.listen(this.modalElement, 'hidden.bs.modal', () => {
        this.detenerVideo();
      });
    }
  }

  private detenerVideo(): void {
    if (this.videoPlayer) {
      // Reinicia el src del iframe para detener el video
      this.videoPlayer.src = this.videoPlayer.src;
    }
  }

  manejarTeclado(event: KeyboardEvent): void {
    // Si se presiona Enter o Espacio, abre el modal
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Evita el comportamiento predeterminado (como scroll al presionar Espacio)
      this.abrirModalVideo();
    }
  }

  onKeyPress(event: KeyboardEvent, id: number, type: string): void {
    if (!this.isTimerStarted || this.allCorrectSelected) return; // No hacer nada si está deshabilitado

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Evita el desplazamiento en la página con la tecla Espacio
      this.handleCardClick(id, type as 'info' | 'warning');
    }
  }

  completeActivity() {
    this.saved = true;
    this.storageService.setActivityState(this.activityId, { completed: this.completed, saved: this.saved, score: this.score, time: this.elapsedTime, formattedTime: this.formattedTime });
  }

  restartAll() {
    // Reiniciar el contador de tiempo
    this.elapsedTime = 0;
    this.isTimerStarted = false;
    this.formattedTime = '00:00:00';

    this.alerts = {};
    this.correctCards.clear();
    this.allCorrectSelected = false;

    // Restablecer cualquier otra variable de estado si es necesario
    // Por ejemplo, si tienes un contador o alguna lógica de validación:
    this.errorMessage = '';

    this.storageService.resetPage(this.activityId);
    this.completed = false;
    this.saved = false;

    this.stopTimer()

    if (typeof document !== 'undefined') {
      this.showOffCanvas();
    }
  }
}
