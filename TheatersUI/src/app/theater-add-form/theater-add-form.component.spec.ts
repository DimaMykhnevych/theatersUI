import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterAddFormComponent } from './theater-add-form.component';

describe('TheaterAddFormComponent', () => {
  let component: TheaterAddFormComponent;
  let fixture: ComponentFixture<TheaterAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheaterAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheaterAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
