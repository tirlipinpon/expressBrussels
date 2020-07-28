import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Store, select} from "@ngrx/store";
import {
  RootStoreState,

  ClientsStoreActions,
  ClientsStoreSelectors,

  PrixZonesMotoStoreActions,
  PrixZonesMotoStoreSelectors,

  PrixZonesCarStoreActions,
  PrixZonesCarStoreSelectors
} from '../../root-store';
import {DataForm} from "../../../models/DataForm";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorDuplicateString} from "../../../shared/validators/validators-conflict.directive";
import {PrixZone} from "../../../models/prixZone";
import {skipWhile, distinctUntilChanged} from "rxjs/internal/operators";
import {NotificationService} from "../../../services/notification.service";
import {ClientsService} from "../services/clients.service";


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, OnDestroy {

  allItems$: Observable<DataForm[]>;
  clientsItems$: Observable<DataForm[]>;
  clientsById$: Observable<DataForm>;
  clientsPrixZoneMoto$: Observable<PrixZone>;
  clientsPrixZoneCar$: Observable<PrixZone>;
  clientsByName$: Observable<DataForm>;
  removalsByClientId$: Observable<DataForm[]>;
  error$: Observable<string>;
  selectTotal$: Observable<number>;
  private cpt: number;
  myClientForm: FormGroup;
  myPrixZoneMotoForm: FormGroup;
  myPrixZoneCarForm: FormGroup;
  private sub$: Subscription;
  private subscriptions = [];

  constructor(private store$: Store<RootStoreState.State>,
              private fb: FormBuilder,
              private notificationsService: NotificationService) {
  }

  ngOnInit() {
    this.allItems$ = this.store$.pipe(
      select( ClientsStoreSelectors.selectAllItems )
    );
    this.clientsItems$ = this.store$.pipe(
      select( ClientsStoreSelectors.selectClientsItems(0) )
    );
    this.selectTotal$ = this.store$.pipe(
      select( ClientsStoreSelectors.selectTotal )
    );
    this.store$.dispatch(new ClientsStoreActions.LoadRequestAction());
    this.store$.dispatch(new PrixZonesMotoStoreActions.LoadRequestAction());
    this.store$.dispatch(new PrixZonesCarStoreActions.LoadRequestAction());
    this.createFormClient();
    this.createFormPrixZoneMoto();
    this.createFormPrixZoneCar();
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  addClient(client: DataForm) {
    // add client ad after addes load prix zone moto in effect
    this.store$.dispatch(new ClientsStoreActions.AddRequestAction({item: client}));
    this.resetforms();
  }
  updateClient(client: DataForm) {
    this.store$.dispatch(new ClientsStoreActions.UpdateRequestAction({
      id: client.id,
      changes: client
    }));
  }
  updatePrixZoneMoto(prixZoneMoto: PrixZone) {
    this.store$.dispatch(new PrixZonesMotoStoreActions.UpdateRequestAction({
      id: prixZoneMoto.id,
      changes: prixZoneMoto
    }))
  }
  updatePrixZoneCar(prixZoneCar: PrixZone) {
    this.store$.dispatch(new PrixZonesCarStoreActions.UpdateRequestAction({id: prixZoneCar.id, changes: prixZoneCar}))
  }
  createFormClient(): void {
    this.myClientForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3)], [ValidatorDuplicateString(this.clientsItems$, 'name')]],
      ref_client: [null],
      address: [null, Validators.required],
      number: [null, Validators.required],
      cp: [null, Validators.required],
      state: [null, Validators.required],
      addressValidated: [1],
      clientZone: [0],
      phone: [null, Validators.required],
      infos: this.fb.group({
        info1: [null, Validators.required],
        info2: [null, Validators.required],
      }),
      type: [0],
      fk_client: [null],
      active: [1],
      created: [null],
      fk_type: [0],
    });
  }
  createFormPrixZoneMoto(): void {
    this.myPrixZoneMotoForm = this.fb.group({
      id: [null, Validators.required],
      zone1: [null, Validators.required],
      zone2: [null, Validators.required],
      zone3: [null, Validators.required],
      prixKm: [null, Validators.required],
      after15h: [null, Validators.required],
      double_express: [null, Validators.required],
      go_and_back: [null, Validators.required],
      id_client: [null, Validators.required],
    });
  }
  createFormPrixZoneCar(): void {
    this.myPrixZoneCarForm = this.fb.group({
      id: [null, Validators.required],
      zone1: [null, Validators.required],
      zone2: [null, Validators.required],
      zone3: [null, Validators.required],
      prixKm: [null, Validators.required],
      after15h: [null, Validators.required],
      double_express: [null, Validators.required],
      go_and_back: [null, Validators.required],
      id_client: [null, Validators.required],
    });
  }
  selectClientById(id: string) {
    if (id && id.length && id != '0') {
      this.clientsById$ = this.store$.pipe(select(ClientsStoreSelectors.selectClientById(+id)));
      this.sub$ = this.clientsById$.subscribe(client => {
          if (client) {
            this.myClientForm.patchValue(client);

            this.clientsPrixZoneMoto$ = this.store$.pipe(select(PrixZonesMotoStoreSelectors.selectZonesByClientId(+id)));
            this.sub$ = this.clientsPrixZoneMoto$.pipe(distinctUntilChanged(), skipWhile(d => !d)).subscribe(pzm => {
              this.myPrixZoneMotoForm.patchValue(pzm)
            });
            this.subscriptions.push(this.sub$);

            this.clientsPrixZoneCar$ = this.store$.pipe(select(PrixZonesCarStoreSelectors.selectZonesByClientId(+id)));
            this.sub$ = this.clientsPrixZoneCar$.pipe(distinctUntilChanged(), skipWhile(d => !d)).subscribe(pzm => {
              this.myPrixZoneCarForm.patchValue(pzm)
            });
            this.subscriptions.push(this.sub$);

            this.selectRemovalsByClientId(id);
          } else {
            this.notificationsService.notify('error', 'Client not found', 'This id "' + id + '" not exist.');
            this.resetforms();
          }
        });
      this.subscriptions.push(this.sub$);
    } else {
      this.resetforms();
    }
  }
  resetforms() {
    this.myClientForm.reset();
    this.myPrixZoneMotoForm.reset();
    this.myPrixZoneCarForm.reset();
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
    this.store$.dispatch(new ClientsStoreActions.RemoveRequestAction(id));
  }

// useless
  updateOne(id: string): void {
    this.store$.dispatch(new ClientsStoreActions.UpdateRequestAction({
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
          active: Math.floor(Math.random() * 1000) + 3,
          created: '',
          fk_type: Math.floor(Math.random() * 1000) + 3,
        }
      })
    );
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
    } else { // add
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
          active: Math.floor(Math.random() * 1000) + 3,
          created: '',
          fk_type: Math.floor(Math.random() * 1000) + 3,
        }
      }
    ));
  }
}
