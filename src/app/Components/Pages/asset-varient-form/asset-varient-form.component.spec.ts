import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetVarientFormComponent } from './asset-varient-form.component';

describe('AssetVarientFormComponent', () => {
  let component: AssetVarientFormComponent;
  let fixture: ComponentFixture<AssetVarientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetVarientFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetVarientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
