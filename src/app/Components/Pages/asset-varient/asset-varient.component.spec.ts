import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetVarientComponent } from './asset-varient.component';

describe('AssetVarientComponent', () => {
  let component: AssetVarientComponent;
  let fixture: ComponentFixture<AssetVarientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetVarientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetVarientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
