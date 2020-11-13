import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css'],
})
export class MatConfirmDialogComponent implements OnInit {
  public content: string;
  public title: string;
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.content = data.content;
    this.title = data.title;
  }

  ngOnInit(): void {}
}
