import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorTypeFormsComponent } from './vendor-type-forms.component';

describe('VendorTypeFormsComponent', () => {
  let component: VendorTypeFormsComponent;
  let fixture: ComponentFixture<VendorTypeFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorTypeFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorTypeFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
