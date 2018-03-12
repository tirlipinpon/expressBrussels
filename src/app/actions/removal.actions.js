"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_REMOVALS = 'Get Removals';
var GetRemovals = (function () {
    function GetRemovals(payload) {
        this.payload = payload;
        this.type = exports.GET_REMOVALS;
        // console.log('in actions get customer payload= ',payload);
    }
    return GetRemovals;
}());
exports.GetRemovals = GetRemovals;
exports.GET_REMOVALS_SUCCESS = 'Get Removals Success';
var GetRemovalsSuccess = (function () {
    function GetRemovalsSuccess(payload) {
        this.payload = payload;
        this.type = exports.GET_REMOVALS_SUCCESS;
        // console.log('in actions get customer payload= ',payload);
    }
    return GetRemovalsSuccess;
}());
exports.GetRemovalsSuccess = GetRemovalsSuccess;
exports.GET_REMOVALS_FAIL = 'Get Removals Fail';
var GetRemovalsFail = (function () {
    function GetRemovalsFail(payload) {
        this.payload = payload;
        this.type = exports.GET_REMOVALS_FAIL;
        // console.log('in actions get customer payload= ',payload);
    }
    return GetRemovalsFail;
}());
exports.GetRemovalsFail = GetRemovalsFail;
// ===================================================
exports.EDIT_REMOVAL = 'Edit Removal';
var EditRemoval = (function () {
    function EditRemoval(payload) {
        this.payload = payload;
        this.type = exports.EDIT_REMOVAL;
        // console.log('in actions edit customer payload= ',payload);
    }
    return EditRemoval;
}());
exports.EditRemoval = EditRemoval;
exports.EDIT_REMOVAL_SUCCESS = 'Edit Removal Success';
var EditRemovalSuccess = (function () {
    function EditRemovalSuccess(payload) {
        this.payload = payload;
        this.type = exports.EDIT_REMOVAL_SUCCESS;
        // console.log('in actions get customer payload= ',payload);
    }
    return EditRemovalSuccess;
}());
exports.EditRemovalSuccess = EditRemovalSuccess;
exports.EDIT_REMOVAL_FAIL = 'Edit Removal Fail';
var EditRemovalFail = (function () {
    function EditRemovalFail(payload) {
        this.payload = payload;
        this.type = exports.EDIT_REMOVAL_FAIL;
        // console.log('in actions get customer payload= ',payload);
    }
    return EditRemovalFail;
}());
exports.EditRemovalFail = EditRemovalFail;
