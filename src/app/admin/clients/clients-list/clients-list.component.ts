import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {
  RootStoreState,
  ClientsStoreActions,
  ClientsStoreSelectors
} from '../../root-store';
import {DataForm} from "../../../models/DataForm";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorDuplicateString} from "../../../shared/validators/validators-conflict.directive";

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  allItems$: Observable<DataForm[]>;
  clientsItems$: Observable<DataForm[]>;
  clientsById$: Observable<DataForm>;
  clientsByName$: Observable<DataForm>;
  removalsByClientId$: Observable<DataForm[]>;
  error$: Observable<string>;
  selectTotal$: Observable<number>;
  isLoading$: Observable<boolean>;
  private cpt: number;
  myClientForm: FormGroup;

  constructor(private store$: Store<RootStoreState.State>, private fb: FormBuilder) {

  }

  ngOnInit() {

    this.allItems$ = this.store$.select(
      ClientsStoreSelectors.selectAllItems
    );

    this.clientsItems$ = this.store$.select(
      ClientsStoreSelectors.selectClientsItems
    );

    this.selectTotal$ = this.store$.select(
      ClientsStoreSelectors.selectTotal
    );

    this.store$.dispatch( new ClientsStoreActions.LoadRequestAction({id: 1}) );

    this.createFormClient();
  }

  addClient(client: DataForm) {
    this.store$.dispatch(new ClientsStoreActions.AddRequestAction({ item: client }));
  }

  createFormClient(): void {
    this.myClientForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3) ], [ValidatorDuplicateString(this.clientsItems$, 'name')] ],
      ref_client: [null],
      address: [null, Validators.required],
      number: [null],
      cp: [null, Validators.required],
      state: [null, Validators.required],
      addressValidated: [1],
      clientZone: [0],
      phone: [null],
      infos: this.fb.group({
        info1: [''],
        info2: [''],
      }),
      type: [0],
      fk_client: [null],
      active: [1],
      created: [null],
      fk_type: [0],
    });
  }

  selectClientById(id: string) {
    this.clientsById$ = this.store$.select(
      ClientsStoreSelectors.selectClientById(+id)
    );
    this.selectRemovalsByClientId(id);
  }
  selectRemovalsByClientId(id: string) {
    this.removalsByClientId$ = this.store$.select(
      ClientsStoreSelectors.selectRemovalsByClientId(+id)
    );
  }
  selectByName(name: string) {
    this.clientsByName$ = this.store$.select(
      ClientsStoreSelectors.selectClientByName(name)
    );
  }
  removeOne(id: string): void {
    this.store$.dispatch( new ClientsStoreActions.RemoveRequestAction(id) );
  }
  updateOne(id: string): void {
    this.store$.dispatch( new ClientsStoreActions.UpdateRequestAction({
      id: id,
      changes: {
        id: +id,
        name: '',
        ref_client: '',
        address: '',
        number: '',
        cp: Math.floor(Math.random() * 1000) + 3,
        state: '',
        addressValidated: true,
        clientZone: Math.floor(Math.random() * 1000) + 3,
        phone: '',
        infos: {
          info1: '',
          info2: ''
        },
        type: Math.floor(Math.random() * 1000) + 3,
        fk_client: Math.floor(Math.random() * 1000) + 3,
        active:  Math.floor(Math.random() * 1000) + 3,
        created: '',
        fk_type: Math.floor(Math.random() * 1000) + 3,
      }
    }) );
  }
  addOne(): void {
    this.store$.dispatch(new ClientsStoreActions.AddRequestAction({
        item: {
          id: this.cpt++,
          name: '',
          ref_client: '',
          address: '',
          number: '',
          cp: 1,
          state: '',
          addressValidated: true,
          clientZone: 1,
          phone: '',
          infos: {
            info1: '',
            info2: ''
          },
          type: 1,
          fk_client: 1,
          active: 1,
          created: '',
          fk_type: 1,
        }
      }
    ));
  }
  upsertOne(id: string): void {
    let upsertId: number;
    if (id) { // update
      upsertId = +id;
    }else { // add
      upsertId = Math.floor(Math.random() * 1000) + 3;
    }
    this.store$.dispatch(new ClientsStoreActions.UpsertRequestAction({
        item: {
          id: upsertId,
          name: '',
          ref_client: '',
          address: '',
          number: '',
          cp: Math.floor(Math.random() * 1000) + 3,
          state: '',
          addressValidated: true,
          clientZone: Math.floor(Math.random() * 1000) + 3,
          phone: '',
          infos: {
            info1: '',
            info2: ''
          },
          type: Math.floor(Math.random() * 1000) + 3,
          fk_client: Math.floor(Math.random() * 1000) + 3,
          active:  Math.floor(Math.random() * 1000) + 3,
          created: '',
          fk_type: Math.floor(Math.random() * 1000) + 3,
        }
      }
    ));
  }
}
