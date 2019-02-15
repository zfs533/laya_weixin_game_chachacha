var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var AlertView = /** @class */ (function (_super) {
        __extends(AlertView, _super);
        function AlertView() {
            var _this = _super.call(this) || this;
            _this.alpha = 0;
            AlertView._inst = _this;
            return _this;
        }
        Object.defineProperty(AlertView, "Inst", {
            get: function () {
                return this._inst || (this._inst = new AlertView());
            },
            enumerable: true,
            configurable: true
        });
        AlertView.prototype.show = function (info) {
            this.lab_alert.text = info;
            this._playAction();
        };
        AlertView.prototype._playAction = function () {
            var _this = this;
            this.alpha = 0;
            this.y = 100;
            Laya.Tween.to(this, { alpha: 1, y: 50 }, 1000, Laya.Ease.backOut, Laya.Handler.create(this, function () {
                Laya.Tween.to(_this, { alpha: 0, y: 0 }, 1000, null, Laya.Handler.create(_this, function () {
                }));
            }));
        };
        return AlertView;
    }(ui.AlertViewUI));
    view.AlertView = AlertView;
})(view || (view = {}));
//# sourceMappingURL=AlertView.js.map