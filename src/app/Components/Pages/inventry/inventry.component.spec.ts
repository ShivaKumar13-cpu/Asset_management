import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventryComponent } from './inventry.component';

describe('InventryComponent', () => {
  let component: InventryComponent;
  let fixture: ComponentFixture<InventryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
