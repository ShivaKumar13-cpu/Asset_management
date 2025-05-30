import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleFormCreateComponent } from './role-form-create.component';

describe('RoleFormCreateComponent', () => {
  let component: RoleFormCreateComponent;
  let fixture: ComponentFixture<RoleFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleFormCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
