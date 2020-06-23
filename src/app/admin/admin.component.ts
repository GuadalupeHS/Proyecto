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

  id=null;

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

  onUpload() {
    console.log(this.selectedFile);
    
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
        return(result);
      },
      error: function (){
        console.log(self.selectedFile);
      }
    });
  }

}
