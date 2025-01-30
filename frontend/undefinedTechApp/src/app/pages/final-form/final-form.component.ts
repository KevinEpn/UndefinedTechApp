import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { appConfig } from '../../app.config';
import { AppComponent } from '../../app.component'; // Import AppComponent

@Component({
  selector: 'app-final-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './final-form.component.html',
  styleUrl: './final-form.component.css'
})
export class FinalFormComponent  implements OnInit, OnDestroy{
  name: string = '';
  date: Date = new Date();
  score: number = 0;
  time: number = 0;
  formattedTime: string = '00:00:00'

  message: string = '';

  constructor(private storageService: StorageService, private router: Router, private appComponent: AppComponent) {} // Inject AppComponent

  ngOnInit() {
    const state = this.storageService.getActivityState();
    this.score = Object.values(state).reduce((sum, s) => sum + s.score, 0);
    this.time = Object.values(state).reduce((sum, s) => sum + s.time, 0);
    this.formattedTime = this.updateFormattedTime(this.time)
  }

  updateFormattedTime(elapsedTime: number): string {
    const hours = Math.floor(elapsedTime / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((elapsedTime % 3600) / 60).toString().padStart(2, '0');
    const seconds = (elapsedTime % 60).toString().padStart(2, '0');
    return this.formattedTime = `${hours}:${minutes}:${seconds}`;
  }

  submit() {
    const submission = { name: this.name, date: this.date, score: this.score, formattedTime: this.formattedTime };
    console.log('Saving to DB:', submission);
    // Aquí se enviaría a MongoDB con una petición HTTP.
    this.storageService.saveToDataBase(submission).subscribe(() => {
      this.message = 'Data saved successfully!';
      this.storageService.resetAllActivities();
      setTimeout(() => {
        this.router.navigate(['/scoretable']);
      }, 2000);
    },
    (error) => {
      this.message = 'There was an error saving the data.';
      console.error(error);
    }
  );
  }

  ngOnDestroy(): void {
    this.appComponent.cleanNav(); // Call cleanNav function
  }
  
}
