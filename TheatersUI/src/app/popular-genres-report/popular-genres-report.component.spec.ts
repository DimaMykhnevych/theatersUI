import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularGenresReportComponent } from './popular-genres-report.component';

describe('PopularGenresReportComponent', () => {
  let component: PopularGenresReportComponent;
  let fixture: ComponentFixture<PopularGenresReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularGenresReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularGenresReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
