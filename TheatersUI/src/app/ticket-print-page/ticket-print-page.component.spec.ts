import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPrintPageComponent } from './ticket-print-page.component';

describe('TicketPrintPageComponent', () => {
  let component: TicketPrintPageComponent;
  let fixture: ComponentFixture<TicketPrintPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketPrintPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPrintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
