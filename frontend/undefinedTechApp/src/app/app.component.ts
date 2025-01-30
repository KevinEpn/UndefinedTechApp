import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'undefinedTechApp';

  fontSize: number = 16; //tamaño inicial de fuente
  fontSizeMin = 10;
  fontSizeMax = 30;

  menuOption: string = '';
  inNav: boolean = false;

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit() {
    this.storageService.getAllCompletedObservable().subscribe((completed) => {
      if (completed) {
        this.router.navigate(['/final-form']);
      }
    });
  }

  onOption(menuOption: string) {
    this.menuOption = menuOption;
  }

  applyGlobalFontSize() {
    document.documentElement.style.setProperty('--global-font-size', `${this.fontSize}px`);
  } 

  showButton(): boolean {
    if (this.storageService.isAllCompleted()) {
      this.inNav = true;
    }
    return this.inNav;
  }

  public cleanNav() { // Ensure cleanNav is public
    this.inNav = false;
    console.log('cleanNav called');
  }

}
