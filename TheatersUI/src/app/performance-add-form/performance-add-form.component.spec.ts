import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceAddFormComponent } from './performance-add-form.component';

describe('PerformanceAddFormComponent', () => {
  let component: PerformanceAddFormComponent;
  let fixture: ComponentFixture<PerformanceAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
