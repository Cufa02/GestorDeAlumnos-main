import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  hide=true;
  constructor(private fb:FormBuilder, private _snackBar: MatSnackBar, private router: Router){
    this.form = this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    })
  }
  ngOnInit(): void {
    
  }
  ingresar(){
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;


    if(usuario === 'facu' && password === 'gordillo'){
      this.fakeLoading();
    } else{
     this.errorLoginCartel();
    }
  }

  errorLoginCartel(){
    this._snackBar.open('Usuario o contraseña invalidos', '', {
      duration:5000,
      horizontalPosition:'center',
      verticalPosition:'top'
    })
  }

  fakeLoading(){
    this.loading = true;
    setTimeout(( ) => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }
}
