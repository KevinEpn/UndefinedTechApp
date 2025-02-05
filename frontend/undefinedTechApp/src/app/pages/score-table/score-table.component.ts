import { Component, inject, OnInit } from '@angular/core';
import { ScoresService } from '../../services/scores.service';
import { IScores } from '../../models/score.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-table',
  imports: [CommonModule],
  templateUrl: './score-table.component.html',
  styleUrl: './score-table.component.css'
})
export class ScoreTableComponent implements OnInit {

  scoreList: IScores[] = [];
  sortScoreAscending: boolean = true;
  results: IScores[] = [];

  private _apiService = inject(ScoresService);
  
  
 
  ngOnInit(): void {
    this
    this.chargeScores();
  }

  chargeScores() {
    this._apiService.getScores().subscribe((data: IScores[]) => {
      console.log('Cargando datos', data);
      this.scoreList = data;      
      this.results = data;
    },
    error => {
      console.log('Error al cargar los datos', error);
    }
  );
  }  

  sortByScore() {
    this.sortScoreAscending = !this.sortScoreAscending;
    this.results.sort((a, b) =>
      this.sortScoreAscending ? a.score - b.score : b.score - a.score
    );
  }
}
