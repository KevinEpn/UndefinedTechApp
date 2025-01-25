import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  private apiUrl = 'http://localhost:3000/api/scores';

  constructor(private http: HttpClient) {}

  
}
