import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada: boolean = false;
  equipo = {};

  constructor(private http: HttpClient) { 
    console.log("Info pagina cargada");
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json')
        .subscribe( (response: InfoPagina) => {
          this.cargada = true;
          this.info = response;
        })
  }

  private cargarEquipo(){
    this.http.get('https://angular-templated.firebaseio.com/equipo.json')
             .subscribe( (res: any) => {
               this.equipo = res;
    })
  }
}
