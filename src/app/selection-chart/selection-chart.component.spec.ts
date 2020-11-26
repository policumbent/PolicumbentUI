import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionChartComponent } from './selection-chart.component';

describe('SelectionChartComponent', () => {
  let component: SelectionChartComponent;
  let fixture: ComponentFixture<SelectionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
