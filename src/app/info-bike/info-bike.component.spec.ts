import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBikeComponent } from './info-bike.component';

describe('InfoBikeComponent', () => {
  let component: InfoBikeComponent;
  let fixture: ComponentFixture<InfoBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
