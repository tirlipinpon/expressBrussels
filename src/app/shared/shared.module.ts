import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NotificationComponent} from './components/notification/notification.component';
import {GrowlModule} from 'primeng/components/growl/growl';
import {SearchFilterPipe} from './pipe/search-filter.pipe';
import {OptionComponent} from './components/form/option/option.component';
import {InfoComponent} from './components/form/info/info.component';
import {OnBlurDirective} from './directives/on-blur.directive';
import {DropDownDirective} from './directives/drop-down.directive';
import {FormComponent} from './components/form/form.component';
import { ProfileComponent } from './components/profile/profile.component';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {ConfirmDialogModule} from 'primeng/components/confirmdialog/confirmdialog';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import {StoreModule} from '@ngrx/store';
import {OrdersEffectService} from '../effects/orders/orders-effect.service';
import {PurchasseOrderEffectService} from '../effects/order/purchasse-order-effect.service';
import {RemovalEffectService} from '../effects/removals/removal-effect.service';
import {CustomerEffectService} from '../effects/customer/customer-effect.service';
import {RecipientEffectService} from '../effects/recipients/recipient-effect.service';
import {EffectsModule} from '@ngrx/effects';
import {reducers} from './appState';
import {ClientZonesEffectService} from '../effects/client-zones/client-zones-effect.service';
import { ClientCpPipe } from './pipe/client-cp.pipe';
import { InputAutocompletionComponent } from './components/form/input-completion/input-autocompletion.component';
import { AutocompleteGoogleComponent } from './components/form/autocomplete-google/autocomplete-google.component';
import { AddressComponent } from './components/form/address/address.component';
import {PrixZoneMotoEffectService} from "../effects/prix-zone-moto/prix-zone-moto.effect.service";
import {PrixZoneCamionnetteEffectService} from "../effects/prix-zone-camionnette/prix-zone-camionnette.effect.service";
import {ContactEffectService} from "../effects/contact/contact-effect.service";
import {MatAutocompleteModule, MatSelectModule} from "@angular/material";
import { ValidatorClassDirective } from './directives/validator-class.directive';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    GrowlModule,
    DialogModule,
    ConfirmDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,


    EffectsModule.forRoot([
      CustomerEffectService,
      ClientZonesEffectService,
      OrdersEffectService,
      PurchasseOrderEffectService,
      PrixZoneMotoEffectService,
      PrixZoneCamionnetteEffectService,
      RecipientEffectService,
      RemovalEffectService,
      ContactEffectService
    ]),
    // StoreModule.forFeature('todo', customerReducer)
    StoreModule.forRoot(reducers),
  ],
  exports: [
    GrowlModule,
    NotificationComponent,
    FormComponent,
    OptionComponent,
    ProfileComponent,
    ConfirmDialogModule,
    ClientCpPipe,
    InputAutocompletionComponent,
    AutocompleteGoogleComponent,
    AddressComponent,
    ValidatorClassDirective,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    // component
    NotificationComponent,
    FormComponent,
    InfoComponent,
    OptionComponent,
    ProfileComponent,
    InputAutocompletionComponent,
    AutocompleteGoogleComponent,
    AddressComponent,
    // directive
    DropDownDirective,
    OnBlurDirective,
    ValidatorClassDirective,
    // pipe
    ClientCpPipe,
    SearchFilterPipe

  ],
  providers: [
    ConfirmationService
  ]
})
export class SharedModule {}
