import { Component } from '@angular/core';
import { ChartsComponent } from "../charts/charts.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
