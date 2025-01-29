import { Component, ElementRef } from '@angular/core';
declare var bootstrap: any;



@Component({
  selector: 'app-level3',
  imports: [],
  templateUrl: './level3.component.html',
  styleUrl: './level3.component.css'
})
export class Level3Component {
  private videoPlayer: HTMLIFrameElement | null = null;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('videoModal');

    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.detenerVideo();
      });
    }
    this.videoPlayer = this.elementRef.nativeElement.querySelector('#videoPlayer');
  }

  abrirModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('videoModal'));
    modal.show();
  }

  private detenerVideo(): void {
    if (this.videoPlayer) {
      // Reinicia el src del iframe para detener el video
      this.videoPlayer.src = this.videoPlayer.src;
    }
  }
}
