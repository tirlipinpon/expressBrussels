"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_RECIPIENTS = 'Get Recipients';
var GetRecipients = (function () {
    function GetRecipients(payload) {
        this.payload = payload;
        this.type = exports.GET_RECIPIENTS;
        // console.log('in actions get Recipients payload= ',payload);
    }
    return GetRecipients;
}());
exports.GetRecipients = GetRecipients;
exports.GET_RECIPIENTS_SUCCESS = 'Get Recipients Success';
var GetRecipientsSuccess = (function () {
    function GetRecipientsSuccess(payload) {
        this.payload = payload;
        this.type = exports.GET_RECIPIENTS_SUCCESS;
        // console.log('in actions get Recipients payload= ',payload);
    }
    return GetRecipientsSuccess;
}());
exports.GetRecipientsSuccess = GetRecipientsSuccess;
exports.GET_RECIPIENTS_FAIL = 'Get Recipients Fail';
var GetRecipientsFail = (function () {
    function GetRecipientsFail(payload) {
        this.payload = payload;
        this.type = exports.GET_RECIPIENTS_FAIL;
        // console.log('in actions get Recipients payload= ',payload);
    }
    return GetRecipientsFail;
}());
exports.GetRecipientsFail = GetRecipientsFail;
//===================================================
exports.EDIT_RECIPIENT = 'Edit Recipient';
var EditRecipient = (function () {
    function EditRecipient(payload) {
        this.payload = payload;
        this.type = exports.EDIT_RECIPIENT;
        // console.log('in actions edit Recipient payload= ',payload);
    }
    return EditRecipient;
}());
exports.EditRecipient = EditRecipient;
exports.EDIT_RECIPIENT_SUCCESS = 'Edit Recipient Success';
var EditRecipientSuccess = (function () {
    function EditRecipientSuccess(payload) {
        this.payload = payload;
        this.type = exports.EDIT_RECIPIENT_SUCCESS;
        // console.log('in actions get Recipient payload= ',payload);
    }
    return EditRecipientSuccess;
}());
exports.EditRecipientSuccess = EditRecipientSuccess;
exports.EDIT_RECIPIENT_FAIL = 'Edit Recipient Fail';
var EditRecipientFail = (function () {
    function EditRecipientFail(payload) {
        this.payload = payload;
        this.type = exports.EDIT_RECIPIENT_FAIL;
        // console.log('in actions get Recipient payload= ',payload);
    }
    return EditRecipientFail;
}());
exports.EditRecipientFail = EditRecipientFail;
