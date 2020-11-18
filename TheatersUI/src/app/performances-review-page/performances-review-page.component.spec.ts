import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancesReviewPageComponent } from './performances-review-page.component';

describe('PerformancesReviewPageComponent', () => {
  let component: PerformancesReviewPageComponent;
  let fixture: ComponentFixture<PerformancesReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformancesReviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformancesReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
