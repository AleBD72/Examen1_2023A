import { Injectable } from '@angular/core';
import { Instrumentos } from '../shared/Instrumentos';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class InstrumentosService {

  instrumentosListRef: AngularFireList<any>;
  instrumentoRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  //Crear
  createIsnt(apt: Instrumentos){
    return this.instrumentosListRef.push({
      nombre : apt.nombre,
      categoria: apt.categoria,
      marca : apt.marca,
      descripcion : apt.descripcion,
    });
  }

  //obtener uno solo 
  getInstrumento(id: string){
    this.instrumentoRef = this.db.object('/appointment'+ id);
    return this.instrumentoRef;
  }

  //Obtener lista
  getListadoInst (){
    this.instrumentosListRef = this.db.list('/appointment');
    return this.instrumentosListRef;
  }

  //Actualizar
  updateInstrumento(id: any, apt: Instrumentos){
    return this.instrumentoRef.update({
      nombre : apt.nombre,
      categoria: apt.categoria,
      marca : apt.marca,
      descripcion : apt.descripcion,
    })
  }

  //eliminar instrumento
  deleteInstrumento(id:string){
    this.instrumentoRef = this.db.object('/appointment'+ id);
    this.instrumentoRef.remove();
  }
}
