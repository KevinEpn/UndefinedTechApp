import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Level1Component } from './pages/level1/level1.component';
import { Level2Component } from './pages/level2/level2.component';
import { Level3Component } from './pages/level3/level3.component';
import { ScoreTableComponent } from './pages/score-table/score-table.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'level1', component: Level1Component},
    {path: 'level2', component: Level2Component},
    {path: 'level3', component: Level3Component},
    {path: 'scoretable', component: ScoreTableComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
