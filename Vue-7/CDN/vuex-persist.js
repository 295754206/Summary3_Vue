! function(e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports, require("deepmerge")) : "function" == typeof define && define.amd ? define(["exports", "deepmerge"], t) : t((e = e || self).VuexPersistence = {}, e.deepmerge) }(this, function(r, s) {
    "use strict";
    s = s && s.hasOwnProperty("default") ? s.default : s;
    var n = (e.prototype.enqueue = function(e) { return this._queue.push(e), this._flushing ? Promise.resolve() : this.flushQueue() }, e.prototype.flushQueue = function() {
        var t = this;
        this._flushing = !0;
        var r = function() {
            var e = t._queue.shift();
            if (e) return e.then(r);
            t._flushing = !1
        };
        return Promise.resolve(r())
    }, e);

    function e() { this._queue = [], this._flushing = !1 }
    var i = { replaceArrays: { arrayMerge: function(e, t, r) { return t } }, concatArrays: { arrayMerge: function(e, t, r) { return e.concat.apply(e, t) } } };

    function u(e, t, r) { return s(e, t, i[r]) }

    function t(e) {
        var i = this;
        this._mutex = new n, this.subscriber = function(t) { return function(e) { return t.subscribe(e) } }, void 0 === e && (e = {}), this.key = null != e.key ? e.key : "vuex", this.subscribed = !1, this.supportCircular = e.supportCircular || !1, this.supportCircular && (o = require("flatted")), this.mergeOption = e.mergeOption || "replaceArrays";
        var t = !0;
        try { window.localStorage.getItem("") } catch (e) { t = !1 }
        if (e.storage) this.storage = e.storage;
        else if (t) this.storage = window.localStorage;
        else {
            if (!r.MockStorage) throw new Error("Neither 'window' is defined, nor 'MockStorage' is available");
            this.storage = new r.MockStorage
        }
        this.reducer = null != e.reducer ? e.reducer : null == e.modules ? function(e) { return e } : function(s) { return e.modules.reduce(function(e, t) { var r; return u(e, ((r = {})[t] = s[t], r), i.mergeOption) }, {}) }, this.filter = e.filter || function(e) { return !0 }, this.strictMode = e.strictMode || !1, this.RESTORE_MUTATION = function(e, t) {
            for (var r = u(e, t || {}, this.mergeOption), s = 0, i = Object.keys(r); s < i.length; s++) {
                var n = i[s];
                this._vm.$set(e, n, r[n])
            }
        }, this.asyncStorage = e.asyncStorage || !1, this.asyncStorage ? (this.restoreState = null != e.restoreState ? e.restoreState : function(e, t) { return t.getItem(e).then(function(e) { return "string" == typeof e ? i.supportCircular ? o.parse(e || "{}") : JSON.parse(e || "{}") : e || {} }) }, this.saveState = null != e.saveState ? e.saveState : function(e, t, r) { return r.setItem(e, i.asyncStorage ? u({}, t || {}, i.mergeOption) : i.supportCircular ? o.stringify(t) : JSON.stringify(t)) }, this.plugin = function(t) { t.restored = i.restoreState(i.key, i.storage).then(function(e) { i.strictMode ? t.commit("RESTORE_MUTATION", e) : t.replaceState(u(t.state, e || {}, i.mergeOption)), i.subscriber(t)(function(e, t) { i.filter(e) && i._mutex.enqueue(i.saveState(i.key, i.reducer(t), i.storage)) }), i.subscribed = !0 }) }) : (this.restoreState = null != e.restoreState ? e.restoreState : function(e, t) { var r = t.getItem(e); return "string" == typeof r ? i.supportCircular ? o.parse(r || "{}") : JSON.parse(r || "{}") : r || {} }, this.saveState = null != e.saveState ? e.saveState : function(e, t, r) { return r.setItem(e, i.supportCircular ? o.stringify(t) : JSON.stringify(t)) }, this.plugin = function(e) {
            var t = i.restoreState(i.key, i.storage);
            i.strictMode ? e.commit("RESTORE_MUTATION", t) : e.replaceState(u(e.state, t || {}, i.mergeOption)), i.subscriber(e)(function(e, t) { i.filter(e) && i.saveState(i.key, i.reducer(t), i.storage) }), i.subscribed = !0
        })
    }
    var o = JSON;
    r.VuexPersistence = t, r.default = t, Object.defineProperty(r, "__esModule", { value: !0 })
});
//# sourceMappingURL=index.min.js.map