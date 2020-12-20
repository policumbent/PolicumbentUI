import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoWeatherComponent } from './info-weather.component';

describe('InfoWeatherComponent', () => {
  let component: InfoWeatherComponent;
  let fixture: ComponentFixture<InfoWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
