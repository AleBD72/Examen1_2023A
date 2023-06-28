import { Component, OnInit } from '@angular/core';
import {Instrumentos} from '../shared/Instrumentos';
import {InstrumentosService} from './../shared/instrumentos.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  Instrumentos : any = [];

  constructor(private insService: InstrumentosService) {}
  ngOnInit(){
    this.fetchInstrumentos();
    let instrumentoRes = this.insService.getListadoInst();
    instrumentoRes.snapshotChanges().subscribe((res)=>{
      this.Instrumentos= [];
      res.forEach((item)=>{
        let a: any = item.payload.toJSON;
        a['$key']= item.key;
        this.Instrumentos.push(a as Instrumentos)
      })
    })
  }
  fetchInstrumentos() {
    this.insService
    .getListadoInst()
    .valueChanges()
    .subscribe((res)=>{
      console.log(res);
    });
  }
  deleteIns(id:any){
    console.log(id);
    if(window.confirm('Realmente deseas borrar este elemento?')){
      this.insService.deleteInstrumento(id);
    }
  }

}
