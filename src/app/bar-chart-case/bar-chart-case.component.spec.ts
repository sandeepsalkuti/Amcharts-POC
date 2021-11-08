import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartCaseComponent } from './bar-chart-case.component';

describe('BarChartCaseComponent', () => {
  let component: BarChartCaseComponent;
  let fixture: ComponentFixture<BarChartCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
