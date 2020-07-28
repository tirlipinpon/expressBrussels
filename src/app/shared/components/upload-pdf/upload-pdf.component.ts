import {Component, OnInit, Input, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ClientsService} from "../../../admin/clients/services/clients.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.css']
})
export class UploadPdfComponent implements OnInit, OnDestroy {

  @Input() clientId: number;
  @Input() kind: string;
  fileToUpload: File = null;
  message: string;
  private sub$: Subscription;
  private subscriptions = [];

  constructor(private cdr: ChangeDetectorRef,
              private clientsService: ClientsService) { }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    if (this.subscriptions.length) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  uploadFileToActivity() {
    if (this.clientId && this.clientId > 0) {
      this.sub$ = this.clientsService.postFile(this.fileToUpload, this.clientId, this.kind).subscribe(data => {
        this.message = 'File uploaded';
        this.cdr.markForCheck();
      });
      this.subscriptions.push(this.sub$);
    }else {
      this.message = 'Wrong client id -> '+this.clientId;
      this.cdr.markForCheck();
    }
  }

}
