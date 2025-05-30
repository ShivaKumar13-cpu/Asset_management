import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrentyFormComponent } from './warrenty-form.component';

describe('WarrentyFormComponent', () => {
  let component: WarrentyFormComponent;
  let fixture: ComponentFixture<WarrentyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarrentyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarrentyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
