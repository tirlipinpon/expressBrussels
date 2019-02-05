"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnsearchedTermGuard = (function () {
    function UnsearchedTermGuard() {
    }
    UnsearchedTermGuard.prototype.canDeactivate = function (component, route, state) {
        console.log("UnsearchedTermGuard");
        console.log(state.url);
        return component.canDeactivate() || window.confirm("Are you sure?");
    };
    return UnsearchedTermGuard;
}());
exports.UnsearchedTermGuard = UnsearchedTermGuard;
