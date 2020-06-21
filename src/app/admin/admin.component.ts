import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  constructor() { }

  
  ngOnInit(): void {
  }

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    //this.http.post('localhost:4200/assets/uploads/'+this.selectedFile.name, this.selectedFile);
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
        console.log("HELPED")
        console.log(self.selectedFile);

      },
      error: function (){
        console.log(self.selectedFile);
      }
    });
  }

}
