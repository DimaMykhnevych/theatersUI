import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openConfirmDialog(data: object) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      disableClose: true,
      data: data,
    });
  }
}
