import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmenytFormComponent } from './add-departmenyt-form.component';

describe('AddDepartmenytFormComponent', () => {
  let component: AddDepartmenytFormComponent;
  let fixture: ComponentFixture<AddDepartmenytFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDepartmenytFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDepartmenytFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
