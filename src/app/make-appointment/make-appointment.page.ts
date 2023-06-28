import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InstrumentosService } from './../shared/instrumentos.service'

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})
export class MakeAppointmentPage implements OnInit {

  instrumentoForm: FormGroup;

  constructor(
    private insService : InstrumentosService,
    private router : Router,
    public fb : FormBuilder
  ) { }

  ngOnInit() {
    this.instrumentoForm = this.fb.group({
      nombre : [''],
      categoria : [''],
      marca: [''],
      descripcion: ['']
    })
  }

  formSubmit(){
    if(!this.instrumentoForm.valid){
      return false;
    }else{
      return this.insService
      .createIsnt(this.instrumentoForm.value)
      .then((res)=>{
        console.log(res);
        this.instrumentoForm.reset();
        this.router.navigate(['/home']);
      })
      .catch((error) => console.log(error));
    }
  }

}
