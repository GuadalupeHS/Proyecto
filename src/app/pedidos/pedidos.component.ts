import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})



export class PedidosComponent implements OnInit {
  ngOnInit(): void {
  }

  
  // pedido={
  //   id:'',
  //   usuario:'',
  //   calle:'',
  //   numero_exterior:'',
  //   numero_interior:'',
  //   colonia:'',
  //   codigo_postal:'',
  //   municipio:'',
  //   estado:'',
  //   pais:''
  // }
  cuentas = []; 

  isLoadingCuentas = true;
  usuario='';
  SearchCuenta = function()
  { 
    var params ='?';
    var numParams =0;
    var self = this; 
    if ( this.usuario != null)
    {
      params += ( numParams != 0 ? '&': '')+ 'usuario=' + this.usuario;
      numParams++;
    }
    
    $.ajax ({
      method: 'get',
      url: 'http://localhost:777/cuenta/search' + params,
      success: function(result){
        self.cuentas=result;
        self.isLoadingCuentas=false;
      // alert ('Ok');
    },
    error:function (xhr, ajaxOptions, thrownError){
      self.cuentas=[];
      self.isLoadingCuentas=false;
    // alert('error');
    }
  });

}


  
  // constructor() { }
  
}



    // var params = '';
    // params += 'usuario=' + this.cuenta.usuario+ '&';
    // params += 'calle=' + this.cuenta.calle + '&';
    // params += 'numero_exterior=' + this.cuenta.numero_exterior + '&';
    // params += 'numero_interior=' + this.cuenta.numero_interior + '&';
    // params += 'colonia=' + this.cuenta.colonia + '&';
    // params += 'codigo_postal=' + this.cuenta.codigo_postal + '&';
    // params += 'municipio=' + this.cuenta.municipio + '&';
    // params += 'estado=' + this.cuenta.estado + '&';
    // params += 'pais=' + this.cuenta.pais;
    // var params = this.cuenta.usuario;

    // var datos= this.cuenta.usuario +' '+ this.cuenta.calle + ' '+ this.cuenta.numero_interior + ' '+ this.cuenta.colonia;
    // console.log(datos);