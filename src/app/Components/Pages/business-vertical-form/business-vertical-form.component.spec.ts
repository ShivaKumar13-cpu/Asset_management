import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessVerticalFormComponent } from './business-vertical-form.component';

describe('BusinessVerticalFormComponent', () => {
  let component: BusinessVerticalFormComponent;
  let fixture: ComponentFixture<BusinessVerticalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessVerticalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessVerticalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
