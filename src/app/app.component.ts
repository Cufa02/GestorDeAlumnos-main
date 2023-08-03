import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'proyecto';
  displayedColumns: string[] = ['alumnoNombre', 'alumnoApellido', 'borrarEditar'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService){

  }
  ngOnInit(): void {
    this.getAllAlumnos();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    });
  }
  getAllAlumnos(){
    this.api.getAlumno()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error al imprimir los alumnos")
      }
    })
  }
  editarAlumno(row: any){
    this.dialog.open(DialogComponent,{ 
      width:'30%',
      data:row
    })
  }

  borrarAlumno(id:number){
    this.api.borrarAlumno( id)
    .subscribe({
      next:(res)=>{
        alert("Alumno Borrado");
        this.getAllAlumnos();
      },
      error:()=>{
        alert("Error al borrar el alumno")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
