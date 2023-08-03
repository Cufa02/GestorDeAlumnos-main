import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  opened= false;
  constructor(public dialog: MatDialog){

  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    });
  }
}
