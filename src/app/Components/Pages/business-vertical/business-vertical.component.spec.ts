import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessVerticalComponent } from './business-vertical.component';

describe('BusinessVerticalComponent', () => {
  let component: BusinessVerticalComponent;
  let fixture: ComponentFixture<BusinessVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessVerticalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
