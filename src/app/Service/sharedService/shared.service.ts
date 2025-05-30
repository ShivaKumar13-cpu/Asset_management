import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private selectedDivisionSubject = new BehaviorSubject<any>(null);
  selectedDivision$ = this.selectedDivisionSubject.asObservable();

  setDivision(selected: any) {
    this.selectedDivisionSubject.next(selected);
  }

  getCurrentDivision() {  
    return this.selectedDivisionSubject.getValue();
  }
}
