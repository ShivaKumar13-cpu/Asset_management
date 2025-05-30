import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('shakeAnimation', [
      state('Invalid', style({
        transform: 'translateX(-10px)' // Adjust as needed
      })),
      transition('* => Invalid', [
        animate('0.5s', keyframes([
          style({ transform: 'translateX(-10px)', offset: 0.1 }),
          style({ transform: 'translateX(10px)', offset: 0.2 }),
          style({ transform: 'translateX(-10px)', offset: 0.3 }),
          style({ transform: 'translateX(10px)', offset: 0.4 }),
          style({ transform: 'translateX(-10px)', offset: 0.5 }),
          style({ transform: 'translateX(10px)', offset: 0.6 }),
          style({ transform: 'translateX(-10px)', offset: 0.7 }),
          style({ transform: 'translateX(10px)', offset: 0.8 }),
          style({ transform: 'translateX(-10px)', offset: 0.9 }),
          style({ transform: 'translateX(0)', offset: 1.0 })
        ]))
      ])
    ])
  ],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {
  toasts: { header: string, body: string, time: string, mess: string }[] = [];

  showToast(header: string, body: string, mess: string) {
    const time = new Date().toLocaleTimeString();
    const toast = { header, body, time, mess };
    this.toasts.push(toast);
    setTimeout(() => this.removeToast(toast), 4000);
    return toast;
  }

  removeToast(toast: { header: string, body: string, time: string, mess: string }) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }


  getBackgroundColor(mess: any): string {
    switch (mess) {
      case 'danger':
        return '#dc3545'; // or any other color
      case 'success':
        return '#20c997'; // or any other color
      case 'warning':
        return '#fd7e14'; // or any other color
      default:
        return '#072f5f'; // or any default color
    }
  }

  getTextColor(mess: any): string {
    // Adjust text color based on background color if needed
    // For example, return 'white' for dark background colors
    return 'white'; // or any default text color
  }
}
