import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-level1',
  imports: [CommonModule],
  templateUrl: './level1.component.html',
  styleUrl: './level1.component.css'
})
export class Level1Component implements OnInit, OnDestroy {
  elapsedTime: number = 0;
  formattedTime = '00:00:00';
  timer: any;
  isTimerStarted = false;

  droppedItems = new Set<string>();

  errorMessage: string | null = null;
  errorItem: string | null = null;

  puntuacion: number | null = null;
  completedMessage: string | null = null;

  private videoPlayer: HTMLIFrameElement | null = null;
  private modalElement: HTMLElement | null = null;
  
  
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  

  ngOnInit(): void {
    this.restartAll();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  showOffCanvas() {
    const offCanvasElement = document.getElementById('offcanvasScrolling');
    const offCanvas = new bootstrap.Offcanvas(offCanvasElement);
    offCanvas.show();
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

  onDragStart(event: DragEvent, itemName: string) {
    if (event.dataTransfer && this.isTimerStarted) {
      event.dataTransfer.setData('text/plain', itemName);
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDrop(event: DragEvent, expectedItem: string) {
    event.preventDefault();
    const draggedItem = event.dataTransfer?.getData('text/plain');
    if (draggedItem === expectedItem && !this.droppedItems.has(draggedItem)) {
      this.droppedItems.add(draggedItem);

      // Verifica si todos los objetos han sido soltados
      if (this.droppedItems.size === 4) {
        this.stopTimer();
        this.showModalCompleted();
        
      }
    } else if (draggedItem !== expectedItem) {
      this.showError(draggedItem || '', expectedItem);
    }
  }

  showError(draggedItem: string, expectedItem: string) {
    this.errorItem = draggedItem;
    if (draggedItem === 'Objeto 1' && expectedItem !== 'Objeto 1') {
      this.errorMessage = 'Pista objeto 1';
    } else if (draggedItem === 'Objeto 2' && expectedItem !== 'Objeto 2') {
      this.errorMessage = 'Pista objeto 2';
    } else if (draggedItem === 'Objeto 3' && expectedItem !== 'objeto 3') {
      this.errorMessage = 'Pista objeto 3';
    } else if (draggedItem === 'Objeto 4' && expectedItem !== 'objeto 4') {
      this.errorMessage = 'Pista objeto 4';
    } else {
      this.errorMessage = 'Este objeto no pertenece aquí.';
    }

    // Abrir el modal de error con Bootstrap Modal
    const modalElement = document.getElementById('errorModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  showModalCompleted(): void {
    // Calcular puntuación antes de mostrar el modal
    const tiempoEnMinutos = this.elapsedTime / 60000; // Convertir ms a minutos

    if (tiempoEnMinutos <= 5) {
      this.puntuacion = 10;
    } else if (tiempoEnMinutos <= 6) {
      this.puntuacion = 9;
    } else if (tiempoEnMinutos <= 7) {
      this.puntuacion = 8;
    } else if (tiempoEnMinutos <= 8) {
      this.puntuacion = 7;
    } else if (tiempoEnMinutos <= 9) {
      this.puntuacion = 6;
    } else if (tiempoEnMinutos <= 10) {
      this.puntuacion = 5;
    } else {
      this.puntuacion = 4;
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

  restartAll() {
    // Reiniciar el contador de tiempo
    this.elapsedTime = 0;
    this.isTimerStarted = false;
    this.droppedItems = new Set<string>();

    // Restablecer cualquier otra variable de estado si es necesario
    // Por ejemplo, si tienes un contador o alguna lógica de validación:
    this.errorMessage = '';

    this.stopTimer()

    if (typeof document !== 'undefined') {
      this.showOffCanvas();    
      this.ngAfterViewInit(); 
    } 
  }
}
