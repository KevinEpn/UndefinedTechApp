import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
declare var bootstrap: any;



@Component({
  selector: 'app-level3',
  imports: [CommonModule],
  templateUrl: './level3.component.html',
  styleUrl: './level3.component.css'
})
export class Level3Component {
  elapsedTime: number = 0;
    formattedTime = '00:00:00';
    timer: any;
    isTimerStarted = false;
  
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
      
  
      // Restablecer cualquier otra variable de estado si es necesario
      // Por ejemplo, si tienes un contador o alguna lógica de validación:
      // this.errorMessage = '';
  
      this.stopTimer()
  
      if (typeof document !== 'undefined') {
        this.showOffCanvas();    
        this.ngAfterViewInit(); 
      } 
    }
  
}
