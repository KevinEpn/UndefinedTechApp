import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity',
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit {
  activityId: string = 'actividad1';
  score: number = 0;
  time: number = 0;
  completed: boolean = false;
  saved: boolean = false;
  formattedTime: string = '';

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    const state = this.storageService.getActivityState()[this.activityId];
    if (state) {
      this.score = state.score;
      this.formattedTime = state.formattedTime;
      this.completed = state.completed;
      this.saved = state.saved;
    }
  }

  completeActivity(score: number, time: number) {
    this.score = score;
    this.time = time;
    this.completed = true;
    this.storageService.setActivityState(this.activityId, { completed: this.completed, saved: this.saved, score: this.score, time: this.time, formattedTime: this.formattedTime });
  }

  resetActivity() {
    this.storageService.resetPage(this.activityId);
    this.score = 0;
    this.time = 0;
    this.completed = false;
  }
}
