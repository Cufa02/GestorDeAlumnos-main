import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  alumnoForm !: FormGroup;
  botonEditarBorrar: string = 'Guardar'
  constructor(private formBuilder : FormBuilder, private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>){}
  ngOnInit(): void {
    this.alumnoForm = this.formBuilder.group({
      alumnoNombre : ['', Validators.required],
      alumnoApellido : ['', Validators.required],
    });
    if(this.editData){
      this.botonEditarBorrar = 'Actualizar';
      this.alumnoForm.controls['alumnoNombre'].setValue(this.editData.alumnoNombre)
      this.alumnoForm.controls['alumnoApellido'].setValue(this.editData.alumnoApellido)
    }
  }
  addAlumno(){
    if(!this.editData){
      if(this.alumnoForm.valid){
        this.api.postAlumno(this.alumnoForm.value)
        .subscribe({
          next:(res)=>{
            alert("Alumno agregado")
            this.alumnoForm.reset();
            this.dialogRef.close('guardado');
          },
          error:()=>{
            alert("Error agregando el alumno")
          }
        })
      }
      
    }else{
      this.actualizarAlumno() 
    }
      
  }
  actualizarAlumno(){
    this.api.putAlumno(this.alumnoForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        this.alumnoForm.reset();
        alert("Alumno actualizado");
        this.dialogRef.close('actualizado');
        
      },
      error:()=>{
        alert("Hubo un error actualizando el alumno")
      }
    })
  } 
}
