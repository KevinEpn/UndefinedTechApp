import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'undefinedTechApp';

  fontSize: number = 16; //tamaño inicial de fuente
  fontSizeMin = 10;
  fontSizeMax = 30;

  menuOption: string = '';

  onOption(menuOption: string) {
    this.menuOption = menuOption;
  }

  applyGlobalFontSize() {
    document.documentElement.style.setProperty('--global-font-size', `${this.fontSize}px`);
  }
}
