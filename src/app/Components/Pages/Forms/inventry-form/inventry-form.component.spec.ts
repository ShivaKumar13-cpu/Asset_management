import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventryFormComponent } from './inventry-form.component';

describe('InventryFormComponent', () => {
  let component: InventryFormComponent;
  let fixture: ComponentFixture<InventryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
