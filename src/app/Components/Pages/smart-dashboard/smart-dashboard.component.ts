import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)
declare var $: any; // Declare jQuery


@Component({
  selector: 'app-smart-dashboard',
  standalone: true,
  imports: [CommonModule,],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './smart-dashboard.component.html',
  styleUrl: './smart-dashboard.component.scss'
})
export class SmartDashboardComponent implements OnInit, AfterViewInit {
  selectedTab: string = 'cam3'; // Default selected tab
  currentDate: string = new Date().toLocaleDateString();
  weather: any = { city: 'Loading...', temp: '--', condition: 'Fetching...', icon: '' };

  stats = [
    { value: 21, unit: '°C', label: 'Living Room', description: 'Temperature' },
    { value: 44, unit: '%', label: 'Outside', description: 'Humidity' },
    { value: 87, unit: 'm³', label: 'Water', description: 'Consumption' },
    { value: 417, unit: 'GB', label: 'Internet', description: 'All devices' }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUserLocation();
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  getUserLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.getWeather(lat, lon);
        },
        (error) => {
          console.error('Error getting location:', error);
          this.weather.city = 'Location Unavailable';
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.weather.city = 'Geolocation Not Supported';
    }
  }

  getWeather(lat: number, lon: number) {
    const apiKey = 'c53bc8571034ff2adbd570db9dc3bd24';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    this.http.get<any>(url).subscribe(
      (data) => {
        this.weather.city = data.name;
        this.weather.temp = Math.round(data.main.temp);
        this.weather.condition = data.weather[0].description;
        this.weather.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      },
      (error) => {
        console.error('Error fetching weather data:', error);
        this.weather.city = 'Weather Unavailable';
      }
    );
  }

  @ViewChild('consumptionChart') consumptionChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('consWeekChart') consWeekChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('roundSlider', { static: false }) roundSlider!: ElementRef;

  totalConsumption: number = 471.3;
  temperature: number = 21;  // Default temperature

  rooms = [
    { name: 'Living Room', percentage: 15, badgeClass: 'bg-primary' },
    { name: 'Kitchen', percentage: 20, badgeClass: 'bg-gradient-secondary' },
    { name: 'Attic', percentage: 13, badgeClass: 'bg-gradient-info' },
    { name: 'Garage', percentage: 32, badgeClass: 'bg-gradient-success' },
    { name: 'Basement', percentage: 20, badgeClass: 'bg-gradient-warning' }
  ];

  ngAfterViewInit(): void {
    this.initConsumptionChart();
    this.initConsWeekChart();
    $(this.roundSlider.nativeElement).roundSlider({
      radius: 80,
      min: 10,
      max: 40,
      value: this.temperature,
      sliderType: "min-range",
      handleShape: "dot",
      tooltipFormat: (e: any) => `${e.value}°C`
    });
  }

  private initConsumptionChart(): void {
    new Chart(this.consumptionChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.rooms.map(room => room.name),
        datasets: [{
          data: this.rooms.map(room => room.percentage),
          backgroundColor: ['#007bff', '#6c757d', '#17a2b8', '#28a745', '#ffc107']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false 
          }
        }
      }
    });
  }

  private initConsWeekChart(): void {
    new Chart(this.consWeekChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Daily Consumption',
          data: [30, 50, 20, 60, 40, 70, 50],
          borderColor: '#007bff',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false 
          }
        }
      }
    });
  }

 



}
