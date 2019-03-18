import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {ClientsService} from "../../../admin/clients/services/clients.service";

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.css']
})
export class UploadPdfComponent implements OnInit {

  @Input() clientId: number;
  @Input() kind: string;
  fileToUpload: File = null;
  message: string;

  constructor(private cdr: ChangeDetectorRef,
              private clientsService: ClientsService) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  uploadFileToActivity() {
    if (this.clientId && this.clientId > 0) {
      this.clientsService.postFile(this.fileToUpload, this.clientId, this.kind).subscribe(data => {
        this.message = 'File uploaded';
        this.cdr.markForCheck();
      });
    }else {
      this.message = 'Wrong client id -> '+this.clientId;
      this.cdr.markForCheck();
    }
  }

}
