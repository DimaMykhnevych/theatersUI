import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancePerformanceReportComponent } from './attendance-performance-report.component';

describe('AttendancePerformanceReportComponent', () => {
  let component: AttendancePerformanceReportComponent;
  let fixture: ComponentFixture<AttendancePerformanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendancePerformanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancePerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
