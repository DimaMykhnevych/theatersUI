import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSalesReportComponent } from './ticket-sales-report.component';

describe('TicketSalesReportComponent', () => {
  let component: TicketSalesReportComponent;
  let fixture: ComponentFixture<TicketSalesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketSalesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
