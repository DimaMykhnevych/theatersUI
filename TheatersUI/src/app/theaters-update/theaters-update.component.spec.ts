import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatersUpdateComponent } from './theaters-update.component';

describe('TheatersUpdateComponent', () => {
  let component: TheatersUpdateComponent;
  let fixture: ComponentFixture<TheatersUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheatersUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheatersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
