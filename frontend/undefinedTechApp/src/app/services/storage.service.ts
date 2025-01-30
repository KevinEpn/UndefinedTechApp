import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

interface ActivityState {
  completed: boolean;
  saved: boolean;
  score: number;
  time: number;
  formattedTime: string
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private key = 'activityState';
  private allCompleted$ = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:3000/scores'; // This is the URL of the API endpoint

  constructor(private http: HttpClient) {
    if (this.isLocalStorageAvailable()) {
      this.allCompleted$.next(this.isAllCompleted());
    }
  }

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  setActivityState(page: string, data: ActivityState) {
    if (!this.isLocalStorageAvailable()) return;
    let state = this.getActivityState();
    state[page] = data;
    localStorage.setItem(this.key, JSON.stringify(state));
    this.allCompleted$.next(this.isAllCompleted());
  }

  getActivityState(): Record<string, ActivityState> {
    if (!this.isLocalStorageAvailable()) return {};
    return JSON.parse(localStorage.getItem(this.key) || '{}');
  }

  resetAllActivities() {
    if (!this.isLocalStorageAvailable()) return;
    localStorage.removeItem(this.key);
    this.allCompleted$.next(false);
  }

  resetPage(page: string) {
    if (!this.isLocalStorageAvailable()) return;
    let state = this.getActivityState();
    delete state[page];
    localStorage.setItem(this.key, JSON.stringify(state));
    this.allCompleted$.next(this.isAllCompleted());
  }

  isAllCompleted(): boolean {
    if (!this.isLocalStorageAvailable()) return false;
    let state: Record<string, ActivityState> = this.getActivityState();
    return Object.keys(state).length === 3 && Object.values(state).every((s: ActivityState) => s.completed);
  }

  getAllCompletedObservable() {
    return this.allCompleted$.asObservable();
  }

  saveToDataBase(submission: { name: string; date: Date; score: number; formattedTime: string }) {
    return this.http.post(`${this.apiUrl}`, submission);
  }
}
