import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {
  estaSobreDrop = false;
  archivos: FileItem[] = [];
  constructor( public _CargaImagenes: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes(){
  this._CargaImagenes.cargarImagenesFirebase( this.archivos );
  }

  pruebaSobreElemnto( event ){
    console.log(event);
  }

  limpiarArchivos(){
    this.archivos = [];
  }

}
