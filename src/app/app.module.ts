import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {PurchasseModule} from "./purchasse-order/purchasse-order.module";
import {Routes, RouterModule} from "@angular/router";
import {PurchasseOrderComponent} from "./purchasse-order/purchasse-order.component";
import {ServiceService} from "./servicse/service.service";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { SortByValuePipe } from './shared/pipe/sort-by-value.pipe';


export const firebaseconfig = {
  apiKey: "AIzaSyDJ6IqRBe0QRccLi7spD3afXC8aMO1VqUw",
  authDomain: "expressbrussel.firebaseapp.com",
  databaseURL: "https://expressbrussel.firebaseio.com",
  projectId: "expressbrussel",
  storageBucket: "expressbrussel.appspot.com",
  messagingSenderId: "801241492660"
};


const appRoutes: Routes = [
  { path: 'purchasseOrder',     component: PurchasseOrderComponent},
];

@NgModule({
  declarations: [ AppComponent, SortByValuePipe ],
  exports: [ AppComponent ],
  imports: [
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFirestoreModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PurchasseModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
