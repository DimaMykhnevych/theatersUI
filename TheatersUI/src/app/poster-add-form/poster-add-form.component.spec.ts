import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterAddFormComponent } from './poster-add-form.component';

describe('PosterAddFormComponent', () => {
  let component: PosterAddFormComponent;
  let fixture: ComponentFixture<PosterAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosterAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
