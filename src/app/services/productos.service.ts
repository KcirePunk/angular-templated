import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/product.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  loading = true;
  producto: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProducto();
  }

  private cargarProducto(){

    return new Promise((resolve, reject) => {
      this.http.get('https://angular-templated.firebaseio.com/productos_idx.json')
      .subscribe( (res:Producto[]) => {
         this.loading = false;
         this.producto = res;
         resolve();
      });
    });

   
  }

  getProducto(id: string){
    return this.http.get(`https://angular-templated.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string){

    if(this.producto.length == 0){
      // cargar productos
      this.cargarProducto().then(()=> {
        // ejecutar despues de tener los productos
        // aplicar fultro
        this.filtrarProducto(termino);
      });
    }else {
      this.filtrarProducto(termino);
    }
  }

  private filtrarProducto(termino: string){
    console.log(this.producto);
    this.productoFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.producto.forEach(prod => {

      const tituloLo = prod.titulo.toLowerCase();

      if(prod.categoria.indexOf(termino) >= 0 || tituloLo.indexOf(termino) >= 0){
        this.productoFiltrado.push(prod);
      }
    });
  }
}
