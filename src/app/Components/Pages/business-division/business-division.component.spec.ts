import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDivisionComponent } from './business-division.component';

describe('BusinessDivisionComponent', () => {
  let component: BusinessDivisionComponent;
  let fixture: ComponentFixture<BusinessDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessDivisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
