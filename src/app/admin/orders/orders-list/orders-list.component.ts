import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FileUploadService} from "../services/file-upload.service";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  fileToUpload: File = null;
  message: string;

  constructor(private fileUploadService: FileUploadService, private cdr: ChangeDetectorRef) { }

  ngOnInit() { }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      console.log(data);
      let msg: string;
      if (data == true) {
        msg = 'File uploaded.' + data;
      }else if(data == false) {
        msg = 'error upload' + data;
      }else{
        msg = 'Unknow error.';
      }
      this.message = msg;
      this.cdr.markForCheck();
    }, error => {
      console.log(error);
      this.message = 'error';
    });
  }

}
