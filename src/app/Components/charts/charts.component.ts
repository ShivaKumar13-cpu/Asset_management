import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements AfterViewInit {

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.renderBarChart();
    this.renderLineChart();
  }

  renderBarChart() {
    const ctx = document.getElementById('chart-bars') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx.getContext('2d')!, {
      type: 'bar',
      data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Sales",
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          backgroundColor: "#fff",
          data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
          maxBarThickness: 6
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        interaction: { intersect: false, mode: 'index' },
        scales: {
          y: {
            min: 0, // ✅ Correct place for min
            max: 500, // ✅ Optional: set max if needed
            grid: {
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              color: "#fff",
              font: { size: 14 }
            }
          },
          x: {
            grid: {
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false
            }
          }
        }

        ,
      },
    });
  }

  renderLineChart() {
    const ctx2 = document.getElementById('chart-line') as HTMLCanvasElement;
    if (!ctx2) return;

    const gradientStroke1 = ctx2.getContext('2d')!.createLinearGradient(0, 230, 0, 50);
    gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)');

    const gradientStroke2 = ctx2.getContext('2d')!.createLinearGradient(0, 230, 0, 50);
    gradientStroke2.addColorStop(1, 'rgba(20,23,39,0.2)');
    gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke2.addColorStop(0, 'rgba(20,23,39,0)');

    new Chart(ctx2.getContext('2d')!, {
      type: "line",
      data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Mobile apps",
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 0,
            borderColor: "#cb0c9f",
            backgroundColor: gradientStroke1,
            fill: true,
            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
          },
          {
            label: "Websites",
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 0,
            borderColor: "#3A416F",
            backgroundColor: gradientStroke2,
            fill: true,
            data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        interaction: { intersect: false, mode: 'index' },
        scales: {
          y: {
            min: 0, // ✅ Correct place for min
            max: 500, // ✅ Optional: set max if needed
            grid: {
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: true,
              color: "grey",
              font: { size: 14 }
            }
          },
          x: {
            grid: {
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
               display: true
            }
          }
        }


        ,
      },
    });
  }
}
