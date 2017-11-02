"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CustomerActions = require("../actions/customer.actions");
var RemovalActions = require("../actions/removal.actions");
var RecipientActions = require("../actions/recipient.actions");
require("rxjs/add/operator/map");
var forms_1 = require("@angular/forms");
var PurchasseOrderComponent = (function () {
    function PurchasseOrderComponent(store, fb) {
        this.store = store;
        this.fb = fb;
        this.customerId = 1;
        this.customer$ = this.store.select('customer');
        this.removals$ = this.store.select('removals');
        this.recipients$ = this.store.select('recipients');
        this.initFormsCustomer();
        this.initFormsRemoval();
        this.initFormsRecipient();
    }
    PurchasseOrderComponent.prototype.canDeactivate = function () {
        return false;
    };
    PurchasseOrderComponent.prototype.ngOnInit = function () {
        //this.store.dispatch({type: CustomerActions.GET_CUSTOMER, payload: this.customerId });
        this.store.dispatch(new CustomerActions.GetCustomer(this.customerId));
        this.store.dispatch(new RemovalActions.GetRemovals(this.customerId * 10 + 1)); // (id + type)  eg: id = 69; type=1 fk_type=691
        this.store.dispatch(new RecipientActions.GetRecipients(this.customerId * 10 + 2)); // (id + type)  eg: id = 69; type=2 fk_type=692
    };
    PurchasseOrderComponent.prototype.onValueCustomerUpdated = function (data) {
        console.log('on customer value  changed: ', data);
        this.store.dispatch(new CustomerActions.EditCustomer(data));
    };
    PurchasseOrderComponent.prototype.onValueRemovalUpdated = function (data) {
        console.log('on removal value  changed: ', data);
        // this.store.dispatch(new CustomerActions.EditRemoval(data));
    };
    PurchasseOrderComponent.prototype.onValueRecipientUpdated = function (data) {
        console.log('on recipient value  changed: ', data);
        // this.store.dispatch(new RecipientActions.EditRecipient(data));
    };
    PurchasseOrderComponent.prototype.initFormsCustomer = function () {
        this.formCustomer = this.fb.group({
            id: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required],
            number: ['', forms_1.Validators.required],
            cp: ['', forms_1.Validators.required],
            state: ['', forms_1.Validators.required],
            phone: ['', forms_1.Validators.required],
            info1: ['', forms_1.Validators.required],
            info2: ['', forms_1.Validators.required],
            type: ['', forms_1.Validators.required],
            fk_client: ['', forms_1.Validators.required],
            active: ['', forms_1.Validators.required],
            created: ['', forms_1.Validators.required],
            fk_type: [0, forms_1.Validators.required]
        });
    };
    PurchasseOrderComponent.prototype.initFormsRemoval = function () {
        this.formRemoval = this.fb.group({
            id: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required],
            number: ['', forms_1.Validators.required],
            cp: ['', forms_1.Validators.required],
            state: ['', forms_1.Validators.required],
            phone: ['', forms_1.Validators.required],
            info1: ['', forms_1.Validators.required],
            info2: ['', forms_1.Validators.required],
            type: ['', forms_1.Validators.required],
            fk_client: ['', forms_1.Validators.required],
            active: ['', forms_1.Validators.required],
            created: ['', forms_1.Validators.required],
            fk_type: ['', forms_1.Validators.required],
        });
    };
    PurchasseOrderComponent.prototype.initFormsRecipient = function () {
        this.formRecipient = this.fb.group({
            id: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required],
            number: ['', forms_1.Validators.required],
            cp: ['', forms_1.Validators.required],
            state: ['', forms_1.Validators.required],
            phone: ['', forms_1.Validators.required],
            info1: ['', forms_1.Validators.required],
            info2: ['', forms_1.Validators.required],
            type: ['', forms_1.Validators.required],
            fk_client: ['', forms_1.Validators.required],
            active: ['', forms_1.Validators.required],
            created: ['', forms_1.Validators.required],
            fk_type: ['', forms_1.Validators.required],
        });
    };
    return PurchasseOrderComponent;
}());
PurchasseOrderComponent = __decorate([
    core_1.Component({
        selector: 'app-purchasse-order',
        templateUrl: './purchasse-order.component.html',
        styleUrls: ['./purchasse-order.component.css']
    })
], PurchasseOrderComponent);
exports.PurchasseOrderComponent = PurchasseOrderComponent;
