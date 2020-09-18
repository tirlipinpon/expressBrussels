import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  ViewChild, ElementRef
} from '@angular/core';
import {Form, FormGroup} from '@angular/forms';
import {DataForm} from '../../../models/DataForm';
import {Contact} from "../../../models/contact";
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import {MatAutocompleteSelectedEvent} from "@angular/material";
import {Router} from "@angular/router";
import {map, startWith} from "rxjs/operators";
import {MyClientZones} from "../../../models/my-client-zones";
import * as fromRoot from "../../appState";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],

})
export class FormComponent implements OnInit, AfterViewInit {

  @Input('isCustomer') isCustomer: string;
  @Input('formGroup') formGroup: FormGroup;
  @Input('nameForm') nameForm: string;
  @Input('contact') contact: Observable<Contact[]>;
  @Input('datas') dataValues:  DataForm[];
  @Output() updateDataForm: EventEmitter<string> = new EventEmitter<string>();
  filteredName$: Observable<string[]>;
  filteredRefClient$: Observable<string[]>;
  @ViewChild("cdk-overlay-2") divView: ElementRef;

  clientZones$: Observable<MyClientZones[]>;
  clientZones: MyClientZones[];
  private sub$: Subscription;
  private subscriptions = [];

  constructor(private router: Router, private store: Store<fromRoot.AppState>) {
    this.clientZones$ = this.store.select(fromRoot.selectors.getClientZonesData);
    this.sub$ = this.clientZones$.subscribe(data => {
      this.clientZones = data;
    });
    this.subscriptions.push(this.sub$);
  }

  ngOnInit() {
    this.filteredName$ = this.formGroup.get('name').valueChanges
      .pipe(
        startWith(''),
        map(value => {
          if (this.dataValues) {
            const resp = this._filter(value, 'name');
            if (!resp  ||   resp.length === 0) {
              this.formGroup.patchValue({
                ref_client: null,
                address: null,
                number: null,
                cp: null,
                state: null,
                clientZone: 0,
              })
            }
            return resp;
          } else {
            return;
          }
        })
      );
    this.filteredRefClient$ = this.formGroup.get('ref_client').valueChanges
      .pipe(
        startWith(''),
        map(value => {
          if (this.dataValues) {
            const resp =  this._filter(value, 'ref_client');

            return resp;
          } else {
            return;
          }
        })
      );
  }

  private _filter(value: string, target: string): any[] {
    if (value && value.length) {
      const filterValue = value.toLowerCase();
      const result  = this.dataValues.filter(option => option[target].toLowerCase().includes(filterValue));
      return result;
    }
    return;
  }

  get isFilteredNotFound(): boolean {
    // return ((filteredName | async)?.length === 0 || (filteredRefClient | async)?.length === 0)

    forkJoin([this.filteredName$, this.filteredRefClient$]).subscribe(results => {
      console.log(results);
      // results[0] is our character
      // results[1] is our character homeworld
      // results[0].homeworld = results[1];
      // this.loadedCharacter = results[0];
    });
    return true;
  }


  goPlaces(nameform: string): void {
    this.router.navigate(['/', 'menu', nameform]).then(nav => {
    }, err => {
      console.log(err) // when there's an error
    });
  }

  ngAfterViewInit() {
    console.log(this.divView);
  }

  itemSelectedName (evt: MatAutocompleteSelectedEvent) {
    this._initData(this.filterStatesName(evt.option.value));
  }
  itemSelectedRefClient (evt: MatAutocompleteSelectedEvent) {
    this._initData(this.filterStatesRefClient(evt.option.value));
  }

  filterStatesName(val: string): DataForm {
    const resp =  this.dataValues.filter(state =>
    state.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
    return resp[0];
  }
  filterStatesRefClient(val: string): DataForm {
    const resp =  this.dataValues.filter(state =>
    state.ref_client.toLowerCase().indexOf(val.toLowerCase()) === 0);
    return resp[0];
  }

  // for customer
  private _initData(data): void {
    this.formGroup.patchValue({
      id: data.id,
      name: data.name,
      ref_client: data.ref_client!=='NULL' ? data.ref_client : '',
      address: data.address,
      number: data.number,
      cp: data.cp,
      state: data.state,
      clientZone: data.clientZone,
      phone: data.phone,
      infos: {
        info1: data.infos.info1,
        info2: data.infos.info2,
      },
      type: data.type,
      fk_client: data.fk_client,
      active: data.active,
      created: data.created,
      fk_type: data.fk_type,
      addressValidated: data.addressValidated
    });
    this.saveDataCustomer();
  }
  saveDataCustomer(): void {
    this.updateDataForm.emit(this.nameForm);
  }

}
