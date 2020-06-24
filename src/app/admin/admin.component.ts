import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  constructor(private router: Router) { }
  productos = [];
  user={
    idProveedor: ''
  }
  idProveedor;
  productoAux = {
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    seccion: ""
  }
  productoNuevo = {
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    seccion: ""
  }

  urlImagen;
  id=null;
  datosIncompletos = false;  

  ngOnInit(): void {
    var cookies = this.GetCookies();
      console.log(cookies);
        if(!cookies['UserID']){
          this.router.navigate(['/'], {});
        }

        var self = this;

        $.get({
          url: 'http://localhost:777/cuenta/' + cookies['UserID'],
          xhrFields: {
            withCredentials: true
          },
          success: function (res) {
            self.user=res;
            self.idProveedor = res.idProveedor;
            self.obtenerProductos(res.idProveedor);
            if(!res.idProveedor){
              self.router.navigate(['/'],{})
            }

          },
          error: function (){
            self.router.navigate(['/'], {});
          }
        });

        console.log(this.user.idProveedor);
        
  }

  GetCookies = function()
  {
    var cookies = document.cookie.split('; ');
    console.log(cookies);
    var array = {};
    for( var i = 0; i < cookies.length; i++ )
    {
      var cookie = cookies[i].split('=');
      array[cookie[0]] = cookie[1];
    }
    return array;
  }

  eliminarProducto = function(id){
    console.log("Eliminar foto");
    var self = this;
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:777/producto/' + id,
      success: function (res){
        if(res.error){
          console.log("Error")
        }else{
          //window.location.reload();        
        }
      },
      error: function (){
        console.log("Error al eliminar")
      }
    });

  }

  obtenerProductos = function(id){
    console.log(id);
    var self = this;
    $.ajax({
      method: 'get',
      url: 'http://localhost:777/producto/search/admin?id='+id,
      success: function (result){
        self.productos = result;
        console.log(result);
      },
      error: function (){
        self.productos = [];
        console.log("no")
      }
    });

  }

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  mostrar = function(id){
    this.id = id;
  }

  actualizarProducto = function(nombre, descripcion, precio, categoria, seccion, link, id){
    var self = this;

    var params = '?';
    if(this.productoAux.nombre != ""){
      params += 'nombre=' + this.productoAux.nombre+ '&';
    }
    if(this.productoAux.descripcion != ""){
      params += 'descripcion=' + this.productoAux.descripcion+ '&';
    }
    if(this.productoAux.precio != ""){
      params += 'precio=' + this.productoAux.precio+ '&';
    }
    if(this.productoAux.categoria != ""){
      params += 'categoria=' + this.productoAux.categoria+ '&';
    }
    if(this.productoAux.seccion != ""){
      params += 'seccion=' + this.productoAux.seccion + '&';
    }

    if(this.selectedFile){
      this.cargarFoto(id, params);
      this.eliminarFoto(link);
    }else{
      this.enviarProductoEditado(id, params)
    }

  }

  agregarProducto = async function(){
    if(!this.productoNuevo.nombre || !this.productoNuevo.descripcion || !this.productoNuevo.precio 
      || !this.productoNuevo.categoria || !this.productoNuevo.seccion){
        this.datosIncompletos = true;
        console.log(this.productoNuevo);
        return;
    }
    if(!this.selectedFile){
      
      this.datosIncompletos = true;
      return;
    }

    this.datosIncompletos = false;

    //Cargar foto al servidor
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    var self = this;
    $.ajax({
      method: 'POST',
      data: fd,
      processData: false,
      contentType: false,
      url: 'http://localhost:777/producto/upload',
      success: function (result){

        var params = '';
        params += 'nombre=' + self.productoNuevo.nombre+ '&';
        params += 'descripcion=' + self.productoNuevo.descripcion + '&';
        params += 'precio=' + self.productoNuevo.precio+ '&';
        params += 'categoria=' + self.productoNuevo.categoria+ '&';
        params += 'seccion=' + self.productoNuevo.seccion + '&';
        params += 'idMarca=' + self.idProveedor + '&';
        params += 'imagenLink=' + result;
        
        self.enviarProducto(params);
      },
      error: function (){
        console.log(self.selectedFile);
      }
    });
    
  }

  enviarProducto(parametros) {
    
    $.ajax({
      method: 'post',
      url: 'http://localhost:777/producto/new?'+parametros,
      success: function (result) {
        if(result.error){
          console.log("Error")
        }else{
          window.location.reload();        
        }
      },
      error: function (){
        console.log("Error :0");
      }
    });

  }

  enviarProductoEditado(id, parametros) {
    
    $.ajax({
      method: 'put',
      url: 'http://localhost:777/producto/'+id + parametros,
      success: function (result) {
        if(result.error){
          console.log("Error")
        }else{
          window.location.reload();        
        }
      },
      error: function (){
        console.log("Error :0");
      }
    });

  }

  cargarFoto(id, parametros){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    var self = this;
    var photoUrl;
    $.ajax({
      method: 'POST',
      data: fd,
      processData: false,
      contentType: false,
      url: 'http://localhost:777/producto/upload',
      success: function (result){
        parametros += 'imagenLink=' + result;
        self.enviarProductoEditado(id, parametros);
      },
      error: function (){
        console.log(self.selectedFile);
      }
    });
  }

  eliminarFoto(link){
    const fd = new FormData();
    var self = this;
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:777/producto/upload?link='+link,
      success: function (result){
        
      },
      error: function (){
        console.log("No se eliminó");
      }
    });
  }

}
