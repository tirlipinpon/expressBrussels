"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_CUSTOMER = 'Get Customer';
var GetCustomer = (function () {
    function GetCustomer(payload) {
        this.payload = payload;
        this.type = exports.GET_CUSTOMER;
        // console.log('in actions get customer payload= ',payload);
    }
    return GetCustomer;
}());
exports.GetCustomer = GetCustomer;
exports.GET_CUSTOMER_SUCCESS = 'Get Customer Success';
var GetCustomerSuccess = (function () {
    function GetCustomerSuccess(payload) {
        this.payload = payload;
        this.type = exports.GET_CUSTOMER_SUCCESS;
        // console.log('in actions get customer payload= ',payload);
    }
    return GetCustomerSuccess;
}());
exports.GetCustomerSuccess = GetCustomerSuccess;
exports.GET_CUSTOMER_FAIL = 'Get Customer Fail';
var GetCustomerFail = (function () {
    function GetCustomerFail(payload) {
        this.payload = payload;
        this.type = exports.GET_CUSTOMER_FAIL;
        // console.log('in actions get customer payload= ',payload);
    }
    return GetCustomerFail;
}());
exports.GetCustomerFail = GetCustomerFail;
//===================================================
exports.EDIT_CUSTOMER = 'Edit Customer';
var EditCustomer = (function () {
    function EditCustomer(payload) {
        this.payload = payload;
        this.type = exports.EDIT_CUSTOMER;
        // console.log('in actions edit customer payload= ',payload);
    }
    return EditCustomer;
}());
exports.EditCustomer = EditCustomer;
exports.EDIT_CUSTOMER_SUCCESS = 'Edit Customer Success';
var EditCustomerSuccess = (function () {
    function EditCustomerSuccess(payload) {
        this.payload = payload;
        this.type = exports.EDIT_CUSTOMER_SUCCESS;
        // console.log('in actions get customer payload= ',payload);
    }
    return EditCustomerSuccess;
}());
exports.EditCustomerSuccess = EditCustomerSuccess;
exports.EDIT_CUSTOMER_FAIL = 'Edit Customer Fail';
var EditCustomerFail = (function () {
    function EditCustomerFail(payload) {
        this.payload = payload;
        this.type = exports.EDIT_CUSTOMER_FAIL;
        // console.log('in actions get customer payload= ',payload);
    }
    return EditCustomerFail;
}());
exports.EditCustomerFail = EditCustomerFail;
