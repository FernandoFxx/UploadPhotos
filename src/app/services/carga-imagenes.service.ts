import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor( private db: AngularFirestore) { }

  cargarImagenesFirebase( imagenes: FileItem[] ) {

  const storageRef = firebase.storage().ref();

  for( const image of imagenes ){

  image.estasubiendo = true;
  if( image.progreso >= 100 ){
    continue;
  }

  const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${image.nombreArchivo}`)
                        .put( image.archivo);
    uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot)=> image.progreso = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
      (error) => console.error('error al subir', error),
      () => {
        console.log('Imagen cargada correctamente');
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          image.url = downloadURL;
          image.estasubiendo = false;
          this.guardarImage({
            nombre: image.nombreArchivo,
            url: image.url
        });
        });
      });

  }

  }
  private guardarImage( imagen: { nombre: string, url: string }){

    this.db.collection(`/${ this.CARPETA_IMAGENES }`)
            .add( imagen );
  }
}
