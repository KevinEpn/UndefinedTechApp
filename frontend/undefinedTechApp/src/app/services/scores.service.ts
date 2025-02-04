import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IScores } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  private _http = inject(HttpClient);
  private apiUrl = 'https://undefinedtechapp-production.up.railway.app/scores';

  constructor(private http: HttpClient) {}

  // Get all scores
  getScores():Observable<IScores[]> {
    return this.http.get<IScores[]>(this.apiUrl);
  }

  // Get score by id
  getScore(id: number): Observable<IScores> {
    return this.http.get<IScores>(`${this.apiUrl}/${id}`);
  }
  
}
