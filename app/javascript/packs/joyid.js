(function (h, T) {
    typeof exports == "object" && typeof module < "u" ? T(exports) : typeof define == "function" && define.amd ? define(["exports"], T) : (h = typeof globalThis < "u" ? globalThis : h || self, T(h.joyID = {}))
})(this, function (h) {
    "use strict";

    function T(r, e) {
        const t = new Uint8Array(r.byteLength + e.byteLength);
        return t.set(new Uint8Array(r), 0), t.set(new Uint8Array(e), r.byteLength), t.buffer
    }

    function O(r) {
        const e = r.replace(/-/g, "+").replace(/_/g, "/"), t = (4 - e.length % 4) % 4, i = e.padEnd(e.length + t, "="),
            n = atob(i), s = new ArrayBuffer(n.length), o = new Uint8Array(s);
        for (let a = 0; a < n.length; a++) o[a] = n.charCodeAt(a);
        return s
    }

    function v(r) {
        const e = new Uint8Array(r);
        let t = "";
        for (let n = 0; n < e.length; n++) {
            const s = e[n];
            t += String.fromCharCode(s)
        }
        return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
    }

    function S(r) {
        const e = new Uint8Array(r.length / 2);
        for (let t = 0; t < r.length; t += 2) e[t / 2] = parseInt(r.substring(t, t + 2), 16);
        return e.buffer
    }

    function z(r) {
        return [...new Uint8Array(r)].map(e => e.toString(16).padStart(2, "0")).join("")
    }

    function we(r) {
        return new TextEncoder().encode(r)
    }

    function ve(r) {
        let e = "";
        for (let t = 0; t < r.length; t += 2) e += String.fromCharCode(parseInt(r.substr(t, 2), 16));
        return e
    }

    function ge() {
        return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone
    }

    var g = 4294967295;

    function xe(r, e, t) {
        var i = t / 4294967296, n = t;
        r.setUint32(e, i), r.setUint32(e + 4, n)
    }

    function $(r, e, t) {
        var i = Math.floor(t / 4294967296), n = t;
        r.setUint32(e, i), r.setUint32(e + 4, n)
    }

    function Z(r, e) {
        var t = r.getInt32(e), i = r.getUint32(e + 4);
        return t * 4294967296 + i
    }

    function Ue(r, e) {
        var t = r.getUint32(e), i = r.getUint32(e + 4);
        return t * 4294967296 + i
    }

    var B, W, F,
        D = (typeof process > "u" || ((B = process == null ? void 0 : process.env) === null || B === void 0 ? void 0 : B.TEXT_ENCODING) !== "never") && typeof TextEncoder < "u" && typeof TextDecoder < "u";

    function Q(r) {
        for (var e = r.length, t = 0, i = 0; i < e;) {
            var n = r.charCodeAt(i++);
            if (n & 4294967168) if (!(n & 4294965248)) t += 2; else {
                if (n >= 55296 && n <= 56319 && i < e) {
                    var s = r.charCodeAt(i);
                    (s & 64512) === 56320 && (++i, n = ((n & 1023) << 10) + (s & 1023) + 65536)
                }
                n & 4294901760 ? t += 4 : t += 3
            } else {
                t++;
                continue
            }
        }
        return t
    }

    function Ee(r, e, t) {
        for (var i = r.length, n = t, s = 0; s < i;) {
            var o = r.charCodeAt(s++);
            if (o & 4294967168) if (!(o & 4294965248)) e[n++] = o >> 6 & 31 | 192; else {
                if (o >= 55296 && o <= 56319 && s < i) {
                    var a = r.charCodeAt(s);
                    (a & 64512) === 56320 && (++s, o = ((o & 1023) << 10) + (a & 1023) + 65536)
                }
                o & 4294901760 ? (e[n++] = o >> 18 & 7 | 240, e[n++] = o >> 12 & 63 | 128, e[n++] = o >> 6 & 63 | 128) : (e[n++] = o >> 12 & 15 | 224, e[n++] = o >> 6 & 63 | 128)
            } else {
                e[n++] = o;
                continue
            }
            e[n++] = o & 63 | 128
        }
    }

    var A = D ? new TextEncoder : void 0,
        Se = D ? typeof process < "u" && ((W = process == null ? void 0 : process.env) === null || W === void 0 ? void 0 : W.TEXT_ENCODING) !== "force" ? 200 : 0 : g;

    function me(r, e, t) {
        e.set(A.encode(r), t)
    }

    function Te(r, e, t) {
        A.encodeInto(r, e.subarray(t))
    }

    var Ae = A != null && A.encodeInto ? Te : me, Ie = 4096;

    function q(r, e, t) {
        for (var i = e, n = i + t, s = [], o = ""; i < n;) {
            var a = r[i++];
            if (!(a & 128)) s.push(a); else if ((a & 224) === 192) {
                var f = r[i++] & 63;
                s.push((a & 31) << 6 | f)
            } else if ((a & 240) === 224) {
                var f = r[i++] & 63, c = r[i++] & 63;
                s.push((a & 31) << 12 | f << 6 | c)
            } else if ((a & 248) === 240) {
                var f = r[i++] & 63, c = r[i++] & 63, l = r[i++] & 63, d = (a & 7) << 18 | f << 12 | c << 6 | l;
                d > 65535 && (d -= 65536, s.push(d >>> 10 & 1023 | 55296), d = 56320 | d & 1023), s.push(d)
            } else s.push(a);
            s.length >= Ie && (o += String.fromCharCode.apply(String, s), s.length = 0)
        }
        return s.length > 0 && (o += String.fromCharCode.apply(String, s)), o
    }

    var _e = D ? new TextDecoder : null,
        Re = D ? typeof process < "u" && ((F = process == null ? void 0 : process.env) === null || F === void 0 ? void 0 : F.TEXT_DECODER) !== "force" ? 200 : 0 : g;

    function De(r, e, t) {
        var i = r.subarray(e, e + t);
        return _e.decode(i)
    }

    var L = function () {
        function r(e, t) {
            this.type = e, this.data = t
        }

        return r
    }(), Le = globalThis && globalThis.__extends || function () {
        var r = function (e, t) {
            return r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (i, n) {
                i.__proto__ = n
            } || function (i, n) {
                for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (i[s] = n[s])
            }, r(e, t)
        };
        return function (e, t) {
            if (typeof t != "function" && t !== null) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            r(e, t);

            function i() {
                this.constructor = e
            }

            e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i)
        }
    }(), w = function (r) {
        Le(e, r);

        function e(t) {
            var i = r.call(this, t) || this, n = Object.create(e.prototype);
            return Object.setPrototypeOf(i, n), Object.defineProperty(i, "name", {
                configurable: !0,
                enumerable: !1,
                value: e.name
            }), i
        }

        return e
    }(Error), Pe = -1, Me = 4294967296 - 1, ke = 17179869184 - 1;

    function Ce(r) {
        var e = r.sec, t = r.nsec;
        if (e >= 0 && t >= 0 && e <= ke) if (t === 0 && e <= Me) {
            var i = new Uint8Array(4), n = new DataView(i.buffer);
            return n.setUint32(0, e), i
        } else {
            var s = e / 4294967296, o = e & 4294967295, i = new Uint8Array(8), n = new DataView(i.buffer);
            return n.setUint32(0, t << 2 | s & 3), n.setUint32(4, o), i
        } else {
            var i = new Uint8Array(12), n = new DataView(i.buffer);
            return n.setUint32(0, t), $(n, 4, e), i
        }
    }

    function be(r) {
        var e = r.getTime(), t = Math.floor(e / 1e3), i = (e - t * 1e3) * 1e6, n = Math.floor(i / 1e9);
        return {sec: t + n, nsec: i - n * 1e9}
    }

    function Ne(r) {
        if (r instanceof Date) {
            var e = be(r);
            return Ce(e)
        } else return null
    }

    function Oe(r) {
        var e = new DataView(r.buffer, r.byteOffset, r.byteLength);
        switch (r.byteLength) {
            case 4: {
                var t = e.getUint32(0), i = 0;
                return {sec: t, nsec: i}
            }
            case 8: {
                var n = e.getUint32(0), s = e.getUint32(4), t = (n & 3) * 4294967296 + s, i = n >>> 2;
                return {sec: t, nsec: i}
            }
            case 12: {
                var t = Z(e, 4), i = e.getUint32(0);
                return {sec: t, nsec: i}
            }
            default:
                throw new w("Unrecognized data size for timestamp (expected 4, 8, or 12): ".concat(r.length))
        }
    }

    function ze(r) {
        var e = Oe(r);
        return new Date(e.sec * 1e3 + e.nsec / 1e6)
    }

    var Be = {type: Pe, encode: Ne, decode: ze}, j = function () {
        function r() {
            this.builtInEncoders = [], this.builtInDecoders = [], this.encoders = [], this.decoders = [], this.register(Be)
        }

        return r.prototype.register = function (e) {
            var t = e.type, i = e.encode, n = e.decode;
            if (t >= 0) this.encoders[t] = i, this.decoders[t] = n; else {
                var s = 1 + t;
                this.builtInEncoders[s] = i, this.builtInDecoders[s] = n
            }
        }, r.prototype.tryToEncode = function (e, t) {
            for (var i = 0; i < this.builtInEncoders.length; i++) {
                var n = this.builtInEncoders[i];
                if (n != null) {
                    var s = n(e, t);
                    if (s != null) {
                        var o = -1 - i;
                        return new L(o, s)
                    }
                }
            }
            for (var i = 0; i < this.encoders.length; i++) {
                var n = this.encoders[i];
                if (n != null) {
                    var s = n(e, t);
                    if (s != null) {
                        var o = i;
                        return new L(o, s)
                    }
                }
            }
            return e instanceof L ? e : null
        }, r.prototype.decode = function (e, t, i) {
            var n = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
            return n ? n(e, t, i) : new L(t, e)
        }, r.defaultCodec = new r, r
    }();

    function P(r) {
        return r instanceof Uint8Array ? r : ArrayBuffer.isView(r) ? new Uint8Array(r.buffer, r.byteOffset, r.byteLength) : r instanceof ArrayBuffer ? new Uint8Array(r) : Uint8Array.from(r)
    }

    function We(r) {
        if (r instanceof ArrayBuffer) return new DataView(r);
        var e = P(r);
        return new DataView(e.buffer, e.byteOffset, e.byteLength)
    }

    var Fe = 100, Je = 2048, Ve = function () {
        function r(e, t, i, n, s, o, a, f) {
            e === void 0 && (e = j.defaultCodec), t === void 0 && (t = void 0), i === void 0 && (i = Fe), n === void 0 && (n = Je), s === void 0 && (s = !1), o === void 0 && (o = !1), a === void 0 && (a = !1), f === void 0 && (f = !1), this.extensionCodec = e, this.context = t, this.maxDepth = i, this.initialBufferSize = n, this.sortKeys = s, this.forceFloat32 = o, this.ignoreUndefined = a, this.forceIntegerToFloat = f, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer)
        }

        return r.prototype.reinitializeState = function () {
            this.pos = 0
        }, r.prototype.encodeSharedRef = function (e) {
            return this.reinitializeState(), this.doEncode(e, 1), this.bytes.subarray(0, this.pos)
        }, r.prototype.encode = function (e) {
            return this.reinitializeState(), this.doEncode(e, 1), this.bytes.slice(0, this.pos)
        }, r.prototype.doEncode = function (e, t) {
            if (t > this.maxDepth) throw new Error("Too deep objects in depth ".concat(t));
            e == null ? this.encodeNil() : typeof e == "boolean" ? this.encodeBoolean(e) : typeof e == "number" ? this.encodeNumber(e) : typeof e == "string" ? this.encodeString(e) : this.encodeObject(e, t)
        }, r.prototype.ensureBufferSizeToWrite = function (e) {
            var t = this.pos + e;
            this.view.byteLength < t && this.resizeBuffer(t * 2)
        }, r.prototype.resizeBuffer = function (e) {
            var t = new ArrayBuffer(e), i = new Uint8Array(t), n = new DataView(t);
            i.set(this.bytes), this.view = n, this.bytes = i
        }, r.prototype.encodeNil = function () {
            this.writeU8(192)
        }, r.prototype.encodeBoolean = function (e) {
            e === !1 ? this.writeU8(194) : this.writeU8(195)
        }, r.prototype.encodeNumber = function (e) {
            Number.isSafeInteger(e) && !this.forceIntegerToFloat ? e >= 0 ? e < 128 ? this.writeU8(e) : e < 256 ? (this.writeU8(204), this.writeU8(e)) : e < 65536 ? (this.writeU8(205), this.writeU16(e)) : e < 4294967296 ? (this.writeU8(206), this.writeU32(e)) : (this.writeU8(207), this.writeU64(e)) : e >= -32 ? this.writeU8(224 | e + 32) : e >= -128 ? (this.writeU8(208), this.writeI8(e)) : e >= -32768 ? (this.writeU8(209), this.writeI16(e)) : e >= -2147483648 ? (this.writeU8(210), this.writeI32(e)) : (this.writeU8(211), this.writeI64(e)) : this.forceFloat32 ? (this.writeU8(202), this.writeF32(e)) : (this.writeU8(203), this.writeF64(e))
        }, r.prototype.writeStringHeader = function (e) {
            if (e < 32) this.writeU8(160 + e); else if (e < 256) this.writeU8(217), this.writeU8(e); else if (e < 65536) this.writeU8(218), this.writeU16(e); else if (e < 4294967296) this.writeU8(219), this.writeU32(e); else throw new Error("Too long string: ".concat(e, " bytes in UTF-8"))
        }, r.prototype.encodeString = function (e) {
            var t = 5, i = e.length;
            if (i > Se) {
                var n = Q(e);
                this.ensureBufferSizeToWrite(t + n), this.writeStringHeader(n), Ae(e, this.bytes, this.pos), this.pos += n
            } else {
                var n = Q(e);
                this.ensureBufferSizeToWrite(t + n), this.writeStringHeader(n), Ee(e, this.bytes, this.pos), this.pos += n
            }
        }, r.prototype.encodeObject = function (e, t) {
            var i = this.extensionCodec.tryToEncode(e, this.context);
            if (i != null) this.encodeExtension(i); else if (Array.isArray(e)) this.encodeArray(e, t); else if (ArrayBuffer.isView(e)) this.encodeBinary(e); else if (typeof e == "object") this.encodeMap(e, t); else throw new Error("Unrecognized object: ".concat(Object.prototype.toString.apply(e)))
        }, r.prototype.encodeBinary = function (e) {
            var t = e.byteLength;
            if (t < 256) this.writeU8(196), this.writeU8(t); else if (t < 65536) this.writeU8(197), this.writeU16(t); else if (t < 4294967296) this.writeU8(198), this.writeU32(t); else throw new Error("Too large binary: ".concat(t));
            var i = P(e);
            this.writeU8a(i)
        }, r.prototype.encodeArray = function (e, t) {
            var i = e.length;
            if (i < 16) this.writeU8(144 + i); else if (i < 65536) this.writeU8(220), this.writeU16(i); else if (i < 4294967296) this.writeU8(221), this.writeU32(i); else throw new Error("Too large array: ".concat(i));
            for (var n = 0, s = e; n < s.length; n++) {
                var o = s[n];
                this.doEncode(o, t + 1)
            }
        }, r.prototype.countWithoutUndefined = function (e, t) {
            for (var i = 0, n = 0, s = t; n < s.length; n++) {
                var o = s[n];
                e[o] !== void 0 && i++
            }
            return i
        }, r.prototype.encodeMap = function (e, t) {
            var i = Object.keys(e);
            this.sortKeys && i.sort();
            var n = this.ignoreUndefined ? this.countWithoutUndefined(e, i) : i.length;
            if (n < 16) this.writeU8(128 + n); else if (n < 65536) this.writeU8(222), this.writeU16(n); else if (n < 4294967296) this.writeU8(223), this.writeU32(n); else throw new Error("Too large map object: ".concat(n));
            for (var s = 0, o = i; s < o.length; s++) {
                var a = o[s], f = e[a];
                this.ignoreUndefined && f === void 0 || (this.encodeString(a), this.doEncode(f, t + 1))
            }
        }, r.prototype.encodeExtension = function (e) {
            var t = e.data.length;
            if (t === 1) this.writeU8(212); else if (t === 2) this.writeU8(213); else if (t === 4) this.writeU8(214); else if (t === 8) this.writeU8(215); else if (t === 16) this.writeU8(216); else if (t < 256) this.writeU8(199), this.writeU8(t); else if (t < 65536) this.writeU8(200), this.writeU16(t); else if (t < 4294967296) this.writeU8(201), this.writeU32(t); else throw new Error("Too large extension object: ".concat(t));
            this.writeI8(e.type), this.writeU8a(e.data)
        }, r.prototype.writeU8 = function (e) {
            this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, e), this.pos++
        }, r.prototype.writeU8a = function (e) {
            var t = e.length;
            this.ensureBufferSizeToWrite(t), this.bytes.set(e, this.pos), this.pos += t
        }, r.prototype.writeI8 = function (e) {
            this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, e), this.pos++
        }, r.prototype.writeU16 = function (e) {
            this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, e), this.pos += 2
        }, r.prototype.writeI16 = function (e) {
            this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, e), this.pos += 2
        }, r.prototype.writeU32 = function (e) {
            this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, e), this.pos += 4
        }, r.prototype.writeI32 = function (e) {
            this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, e), this.pos += 4
        }, r.prototype.writeF32 = function (e) {
            this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, e), this.pos += 4
        }, r.prototype.writeF64 = function (e) {
            this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, e), this.pos += 8
        }, r.prototype.writeU64 = function (e) {
            this.ensureBufferSizeToWrite(8), xe(this.view, this.pos, e), this.pos += 8
        }, r.prototype.writeI64 = function (e) {
            this.ensureBufferSizeToWrite(8), $(this.view, this.pos, e), this.pos += 8
        }, r
    }(), He = {};

    function Ke(r, e) {
        e === void 0 && (e = He);
        var t = new Ve(e.extensionCodec, e.context, e.maxDepth, e.initialBufferSize, e.sortKeys, e.forceFloat32, e.ignoreUndefined, e.forceIntegerToFloat);
        return t.encodeSharedRef(r)
    }

    function J(r) {
        return "".concat(r < 0 ? "-" : "", "0x").concat(Math.abs(r).toString(16).padStart(2, "0"))
    }

    var Ye = 16, Xe = 16, Ge = function () {
        function r(e, t) {
            e === void 0 && (e = Ye), t === void 0 && (t = Xe), this.maxKeyLength = e, this.maxLengthPerKey = t, this.hit = 0, this.miss = 0, this.caches = [];
            for (var i = 0; i < this.maxKeyLength; i++) this.caches.push([])
        }

        return r.prototype.canBeCached = function (e) {
            return e > 0 && e <= this.maxKeyLength
        }, r.prototype.find = function (e, t, i) {
            var n = this.caches[i - 1];
            e:for (var s = 0, o = n; s < o.length; s++) {
                for (var a = o[s], f = a.bytes, c = 0; c < i; c++) if (f[c] !== e[t + c]) continue e;
                return a.str
            }
            return null
        }, r.prototype.store = function (e, t) {
            var i = this.caches[e.length - 1], n = {bytes: e, str: t};
            i.length >= this.maxLengthPerKey ? i[Math.random() * i.length | 0] = n : i.push(n)
        }, r.prototype.decode = function (e, t, i) {
            var n = this.find(e, t, i);
            if (n != null) return this.hit++, n;
            this.miss++;
            var s = q(e, t, i), o = Uint8Array.prototype.slice.call(e, t, t + i);
            return this.store(o, s), s
        }, r
    }(), $e = globalThis && globalThis.__awaiter || function (r, e, t, i) {
        function n(s) {
            return s instanceof t ? s : new t(function (o) {
                o(s)
            })
        }

        return new (t || (t = Promise))(function (s, o) {
            function a(l) {
                try {
                    c(i.next(l))
                } catch (d) {
                    o(d)
                }
            }

            function f(l) {
                try {
                    c(i.throw(l))
                } catch (d) {
                    o(d)
                }
            }

            function c(l) {
                l.done ? s(l.value) : n(l.value).then(a, f)
            }

            c((i = i.apply(r, e || [])).next())
        })
    }, V = globalThis && globalThis.__generator || function (r, e) {
        var t = {
            label: 0, sent: function () {
                if (s[0] & 1) throw s[1];
                return s[1]
            }, trys: [], ops: []
        }, i, n, s, o;
        return o = {
            next: a(0),
            throw: a(1),
            return: a(2)
        }, typeof Symbol == "function" && (o[Symbol.iterator] = function () {
            return this
        }), o;

        function a(c) {
            return function (l) {
                return f([c, l])
            }
        }

        function f(c) {
            if (i) throw new TypeError("Generator is already executing.");
            for (; t;) try {
                if (i = 1, n && (s = c[0] & 2 ? n.return : c[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, c[1])).done) return s;
                switch (n = 0, s && (c = [c[0] & 2, s.value]), c[0]) {
                    case 0:
                    case 1:
                        s = c;
                        break;
                    case 4:
                        return t.label++, {value: c[1], done: !1};
                    case 5:
                        t.label++, n = c[1], c = [0];
                        continue;
                    case 7:
                        c = t.ops.pop(), t.trys.pop();
                        continue;
                    default:
                        if (s = t.trys, !(s = s.length > 0 && s[s.length - 1]) && (c[0] === 6 || c[0] === 2)) {
                            t = 0;
                            continue
                        }
                        if (c[0] === 3 && (!s || c[1] > s[0] && c[1] < s[3])) {
                            t.label = c[1];
                            break
                        }
                        if (c[0] === 6 && t.label < s[1]) {
                            t.label = s[1], s = c;
                            break
                        }
                        if (s && t.label < s[2]) {
                            t.label = s[2], t.ops.push(c);
                            break
                        }
                        s[2] && t.ops.pop(), t.trys.pop();
                        continue
                }
                c = e.call(r, t)
            } catch (l) {
                c = [6, l], n = 0
            } finally {
                i = s = 0
            }
            if (c[0] & 5) throw c[1];
            return {value: c[0] ? c[1] : void 0, done: !0}
        }
    }, ee = globalThis && globalThis.__asyncValues || function (r) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var e = r[Symbol.asyncIterator], t;
        return e ? e.call(r) : (r = typeof __values == "function" ? __values(r) : r[Symbol.iterator](), t = {}, i("next"), i("throw"), i("return"), t[Symbol.asyncIterator] = function () {
            return this
        }, t);

        function i(s) {
            t[s] = r[s] && function (o) {
                return new Promise(function (a, f) {
                    o = r[s](o), n(a, f, o.done, o.value)
                })
            }
        }

        function n(s, o, a, f) {
            Promise.resolve(f).then(function (c) {
                s({value: c, done: a})
            }, o)
        }
    }, m = globalThis && globalThis.__await || function (r) {
        return this instanceof m ? (this.v = r, this) : new m(r)
    }, Ze = globalThis && globalThis.__asyncGenerator || function (r, e, t) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var i = t.apply(r, e || []), n, s = [];
        return n = {}, o("next"), o("throw"), o("return"), n[Symbol.asyncIterator] = function () {
            return this
        }, n;

        function o(p) {
            i[p] && (n[p] = function (u) {
                return new Promise(function (y, E) {
                    s.push([p, u, y, E]) > 1 || a(p, u)
                })
            })
        }

        function a(p, u) {
            try {
                f(i[p](u))
            } catch (y) {
                d(s[0][3], y)
            }
        }

        function f(p) {
            p.value instanceof m ? Promise.resolve(p.value.v).then(c, l) : d(s[0][2], p)
        }

        function c(p) {
            a("next", p)
        }

        function l(p) {
            a("throw", p)
        }

        function d(p, u) {
            p(u), s.shift(), s.length && a(s[0][0], s[0][1])
        }
    }, Qe = function (r) {
        var e = typeof r;
        return e === "string" || e === "number"
    }, I = -1, H = new DataView(new ArrayBuffer(0)), qe = new Uint8Array(H.buffer), K = function () {
        try {
            H.getInt8(0)
        } catch (r) {
            return r.constructor
        }
        throw new Error("never reached")
    }(), te = new K("Insufficient data"), je = new Ge, et = function () {
        function r(e, t, i, n, s, o, a, f) {
            e === void 0 && (e = j.defaultCodec), t === void 0 && (t = void 0), i === void 0 && (i = g), n === void 0 && (n = g), s === void 0 && (s = g), o === void 0 && (o = g), a === void 0 && (a = g), f === void 0 && (f = je), this.extensionCodec = e, this.context = t, this.maxStrLength = i, this.maxBinLength = n, this.maxArrayLength = s, this.maxMapLength = o, this.maxExtLength = a, this.keyDecoder = f, this.totalPos = 0, this.pos = 0, this.view = H, this.bytes = qe, this.headByte = I, this.stack = []
        }

        return r.prototype.reinitializeState = function () {
            this.totalPos = 0, this.headByte = I, this.stack.length = 0
        }, r.prototype.setBuffer = function (e) {
            this.bytes = P(e), this.view = We(this.bytes), this.pos = 0
        }, r.prototype.appendBuffer = function (e) {
            if (this.headByte === I && !this.hasRemaining(1)) this.setBuffer(e); else {
                var t = this.bytes.subarray(this.pos), i = P(e), n = new Uint8Array(t.length + i.length);
                n.set(t), n.set(i, t.length), this.setBuffer(n)
            }
        }, r.prototype.hasRemaining = function (e) {
            return this.view.byteLength - this.pos >= e
        }, r.prototype.createExtraByteError = function (e) {
            var t = this, i = t.view, n = t.pos;
            return new RangeError("Extra ".concat(i.byteLength - n, " of ").concat(i.byteLength, " byte(s) found at buffer[").concat(e, "]"))
        }, r.prototype.decode = function (e) {
            this.reinitializeState(), this.setBuffer(e);
            var t = this.doDecodeSync();
            if (this.hasRemaining(1)) throw this.createExtraByteError(this.pos);
            return t
        }, r.prototype.decodeMulti = function (e) {
            return V(this, function (t) {
                switch (t.label) {
                    case 0:
                        this.reinitializeState(), this.setBuffer(e), t.label = 1;
                    case 1:
                        return this.hasRemaining(1) ? [4, this.doDecodeSync()] : [3, 3];
                    case 2:
                        return t.sent(), [3, 1];
                    case 3:
                        return [2]
                }
            })
        }, r.prototype.decodeAsync = function (e) {
            var t, i, n, s;
            return $e(this, void 0, void 0, function () {
                var o, a, f, c, l, d, p, u;
                return V(this, function (y) {
                    switch (y.label) {
                        case 0:
                            o = !1, y.label = 1;
                        case 1:
                            y.trys.push([1, 6, 7, 12]), t = ee(e), y.label = 2;
                        case 2:
                            return [4, t.next()];
                        case 3:
                            if (i = y.sent(), !!i.done) return [3, 5];
                            if (f = i.value, o) throw this.createExtraByteError(this.totalPos);
                            this.appendBuffer(f);
                            try {
                                a = this.doDecodeSync(), o = !0
                            } catch (E) {
                                if (!(E instanceof K)) throw E
                            }
                            this.totalPos += this.pos, y.label = 4;
                        case 4:
                            return [3, 2];
                        case 5:
                            return [3, 12];
                        case 6:
                            return c = y.sent(), n = {error: c}, [3, 12];
                        case 7:
                            return y.trys.push([7, , 10, 11]), i && !i.done && (s = t.return) ? [4, s.call(t)] : [3, 9];
                        case 8:
                            y.sent(), y.label = 9;
                        case 9:
                            return [3, 11];
                        case 10:
                            if (n) throw n.error;
                            return [7];
                        case 11:
                            return [7];
                        case 12:
                            if (o) {
                                if (this.hasRemaining(1)) throw this.createExtraByteError(this.totalPos);
                                return [2, a]
                            }
                            throw l = this, d = l.headByte, p = l.pos, u = l.totalPos, new RangeError("Insufficient data in parsing ".concat(J(d), " at ").concat(u, " (").concat(p, " in the current buffer)"))
                    }
                })
            })
        }, r.prototype.decodeArrayStream = function (e) {
            return this.decodeMultiAsync(e, !0)
        }, r.prototype.decodeStream = function (e) {
            return this.decodeMultiAsync(e, !1)
        }, r.prototype.decodeMultiAsync = function (e, t) {
            return Ze(this, arguments, function () {
                var n, s, o, a, f, c, l, d, p;
                return V(this, function (u) {
                    switch (u.label) {
                        case 0:
                            n = t, s = -1, u.label = 1;
                        case 1:
                            u.trys.push([1, 13, 14, 19]), o = ee(e), u.label = 2;
                        case 2:
                            return [4, m(o.next())];
                        case 3:
                            if (a = u.sent(), !!a.done) return [3, 12];
                            if (f = a.value, t && s === 0) throw this.createExtraByteError(this.totalPos);
                            this.appendBuffer(f), n && (s = this.readArraySize(), n = !1, this.complete()), u.label = 4;
                        case 4:
                            u.trys.push([4, 9, , 10]), u.label = 5;
                        case 5:
                            return [4, m(this.doDecodeSync())];
                        case 6:
                            return [4, u.sent()];
                        case 7:
                            return u.sent(), --s === 0 ? [3, 8] : [3, 5];
                        case 8:
                            return [3, 10];
                        case 9:
                            if (c = u.sent(), !(c instanceof K)) throw c;
                            return [3, 10];
                        case 10:
                            this.totalPos += this.pos, u.label = 11;
                        case 11:
                            return [3, 2];
                        case 12:
                            return [3, 19];
                        case 13:
                            return l = u.sent(), d = {error: l}, [3, 19];
                        case 14:
                            return u.trys.push([14, , 17, 18]), a && !a.done && (p = o.return) ? [4, m(p.call(o))] : [3, 16];
                        case 15:
                            u.sent(), u.label = 16;
                        case 16:
                            return [3, 18];
                        case 17:
                            if (d) throw d.error;
                            return [7];
                        case 18:
                            return [7];
                        case 19:
                            return [2]
                    }
                })
            })
        }, r.prototype.doDecodeSync = function () {
            e:for (; ;) {
                var e = this.readHeadByte(), t = void 0;
                if (e >= 224) t = e - 256; else if (e < 192) if (e < 128) t = e; else if (e < 144) {
                    var i = e - 128;
                    if (i !== 0) {
                        this.pushMapState(i), this.complete();
                        continue e
                    } else t = {}
                } else if (e < 160) {
                    var i = e - 144;
                    if (i !== 0) {
                        this.pushArrayState(i), this.complete();
                        continue e
                    } else t = []
                } else {
                    var n = e - 160;
                    t = this.decodeUtf8String(n, 0)
                } else if (e === 192) t = null; else if (e === 194) t = !1; else if (e === 195) t = !0; else if (e === 202) t = this.readF32(); else if (e === 203) t = this.readF64(); else if (e === 204) t = this.readU8(); else if (e === 205) t = this.readU16(); else if (e === 206) t = this.readU32(); else if (e === 207) t = this.readU64(); else if (e === 208) t = this.readI8(); else if (e === 209) t = this.readI16(); else if (e === 210) t = this.readI32(); else if (e === 211) t = this.readI64(); else if (e === 217) {
                    var n = this.lookU8();
                    t = this.decodeUtf8String(n, 1)
                } else if (e === 218) {
                    var n = this.lookU16();
                    t = this.decodeUtf8String(n, 2)
                } else if (e === 219) {
                    var n = this.lookU32();
                    t = this.decodeUtf8String(n, 4)
                } else if (e === 220) {
                    var i = this.readU16();
                    if (i !== 0) {
                        this.pushArrayState(i), this.complete();
                        continue e
                    } else t = []
                } else if (e === 221) {
                    var i = this.readU32();
                    if (i !== 0) {
                        this.pushArrayState(i), this.complete();
                        continue e
                    } else t = []
                } else if (e === 222) {
                    var i = this.readU16();
                    if (i !== 0) {
                        this.pushMapState(i), this.complete();
                        continue e
                    } else t = {}
                } else if (e === 223) {
                    var i = this.readU32();
                    if (i !== 0) {
                        this.pushMapState(i), this.complete();
                        continue e
                    } else t = {}
                } else if (e === 196) {
                    var i = this.lookU8();
                    t = this.decodeBinary(i, 1)
                } else if (e === 197) {
                    var i = this.lookU16();
                    t = this.decodeBinary(i, 2)
                } else if (e === 198) {
                    var i = this.lookU32();
                    t = this.decodeBinary(i, 4)
                } else if (e === 212) t = this.decodeExtension(1, 0); else if (e === 213) t = this.decodeExtension(2, 0); else if (e === 214) t = this.decodeExtension(4, 0); else if (e === 215) t = this.decodeExtension(8, 0); else if (e === 216) t = this.decodeExtension(16, 0); else if (e === 199) {
                    var i = this.lookU8();
                    t = this.decodeExtension(i, 1)
                } else if (e === 200) {
                    var i = this.lookU16();
                    t = this.decodeExtension(i, 2)
                } else if (e === 201) {
                    var i = this.lookU32();
                    t = this.decodeExtension(i, 4)
                } else throw new w("Unrecognized type byte: ".concat(J(e)));
                this.complete();
                for (var s = this.stack; s.length > 0;) {
                    var o = s[s.length - 1];
                    if (o.type === 0) if (o.array[o.position] = t, o.position++, o.position === o.size) s.pop(), t = o.array; else continue e; else if (o.type === 1) {
                        if (!Qe(t)) throw new w("The type of key must be string or number but " + typeof t);
                        if (t === "__proto__") throw new w("The key __proto__ is not allowed");
                        o.key = t, o.type = 2;
                        continue e
                    } else if (o.map[o.key] = t, o.readCount++, o.readCount === o.size) s.pop(), t = o.map; else {
                        o.key = null, o.type = 1;
                        continue e
                    }
                }
                return t
            }
        }, r.prototype.readHeadByte = function () {
            return this.headByte === I && (this.headByte = this.readU8()), this.headByte
        }, r.prototype.complete = function () {
            this.headByte = I
        }, r.prototype.readArraySize = function () {
            var e = this.readHeadByte();
            switch (e) {
                case 220:
                    return this.readU16();
                case 221:
                    return this.readU32();
                default: {
                    if (e < 160) return e - 144;
                    throw new w("Unrecognized array type byte: ".concat(J(e)))
                }
            }
        }, r.prototype.pushMapState = function (e) {
            if (e > this.maxMapLength) throw new w("Max length exceeded: map length (".concat(e, ") > maxMapLengthLength (").concat(this.maxMapLength, ")"));
            this.stack.push({type: 1, size: e, key: null, readCount: 0, map: {}})
        }, r.prototype.pushArrayState = function (e) {
            if (e > this.maxArrayLength) throw new w("Max length exceeded: array length (".concat(e, ") > maxArrayLength (").concat(this.maxArrayLength, ")"));
            this.stack.push({type: 0, size: e, array: new Array(e), position: 0})
        }, r.prototype.decodeUtf8String = function (e, t) {
            var i;
            if (e > this.maxStrLength) throw new w("Max length exceeded: UTF-8 byte length (".concat(e, ") > maxStrLength (").concat(this.maxStrLength, ")"));
            if (this.bytes.byteLength < this.pos + t + e) throw te;
            var n = this.pos + t, s;
            return this.stateIsMapKey() && (!((i = this.keyDecoder) === null || i === void 0) && i.canBeCached(e)) ? s = this.keyDecoder.decode(this.bytes, n, e) : e > Re ? s = De(this.bytes, n, e) : s = q(this.bytes, n, e), this.pos += t + e, s
        }, r.prototype.stateIsMapKey = function () {
            if (this.stack.length > 0) {
                var e = this.stack[this.stack.length - 1];
                return e.type === 1
            }
            return !1
        }, r.prototype.decodeBinary = function (e, t) {
            if (e > this.maxBinLength) throw new w("Max length exceeded: bin length (".concat(e, ") > maxBinLength (").concat(this.maxBinLength, ")"));
            if (!this.hasRemaining(e + t)) throw te;
            var i = this.pos + t, n = this.bytes.subarray(i, i + e);
            return this.pos += t + e, n
        }, r.prototype.decodeExtension = function (e, t) {
            if (e > this.maxExtLength) throw new w("Max length exceeded: ext length (".concat(e, ") > maxExtLength (").concat(this.maxExtLength, ")"));
            var i = this.view.getInt8(this.pos + t), n = this.decodeBinary(e, t + 1);
            return this.extensionCodec.decode(n, i, this.context)
        }, r.prototype.lookU8 = function () {
            return this.view.getUint8(this.pos)
        }, r.prototype.lookU16 = function () {
            return this.view.getUint16(this.pos)
        }, r.prototype.lookU32 = function () {
            return this.view.getUint32(this.pos)
        }, r.prototype.readU8 = function () {
            var e = this.view.getUint8(this.pos);
            return this.pos++, e
        }, r.prototype.readI8 = function () {
            var e = this.view.getInt8(this.pos);
            return this.pos++, e
        }, r.prototype.readU16 = function () {
            var e = this.view.getUint16(this.pos);
            return this.pos += 2, e
        }, r.prototype.readI16 = function () {
            var e = this.view.getInt16(this.pos);
            return this.pos += 2, e
        }, r.prototype.readU32 = function () {
            var e = this.view.getUint32(this.pos);
            return this.pos += 4, e
        }, r.prototype.readI32 = function () {
            var e = this.view.getInt32(this.pos);
            return this.pos += 4, e
        }, r.prototype.readU64 = function () {
            var e = Ue(this.view, this.pos);
            return this.pos += 8, e
        }, r.prototype.readI64 = function () {
            var e = Z(this.view, this.pos);
            return this.pos += 8, e
        }, r.prototype.readF32 = function () {
            var e = this.view.getFloat32(this.pos);
            return this.pos += 4, e
        }, r.prototype.readF64 = function () {
            var e = this.view.getFloat64(this.pos);
            return this.pos += 8, e
        }, r
    }(), tt = {};

    function rt(r, e) {
        e === void 0 && (e = tt);
        var t = new et(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength);
        return t.decode(r)
    }

    const re = r => v(Ke(r, {ignoreUndefined: !0})), ie = r => {
        const e = O(r);
        return rt(e)
    }, it = r => ie(r), nt = r => ie(r);

    function st(r) {
        const e = Array.from(new Uint8Array(r), o => `00${o.toString(16)}`.slice(-2)).join(""),
            t = parseInt(e.substr(6, 2), 16) * 2;
        let i = e.substr(8, t), n = e.substr(12 + t);
        i = i.length > 64 ? i.substr(-64) : i.padStart(64, "0"), n = n.length > 64 ? n.substr(-64) : n.padStart(64, "0");
        const s = `${i}${n}`;
        return new Uint8Array(s.match(/[\da-f]{2}/gi).map(o => parseInt(o, 16)))
    }

    var x = (r => (r.Auth = "Auth", r.SignMessage = "SignMessage", r.TransferCotaNFT = "TransferCotaNFT", r.TransferMNFT = "TransferMNFT", r.SignEvm = "SignEvm", r))(x || {}),
        ne = (r => (r.Popup = "popup", r.Redirect = "redirect", r))(ne || {});
    const ot = "https://app.joy.id", se = "https://app.joyid.dev", at = "https://api.joy.id/api/v1",
        oe = "https://api.joyid.dev/api/v1";

    class ct {
        constructor() {
            this.appURL = se, this.serverURL = oe, this.network = "testnet"
        }

        getJoyIDAppURL() {
            return this.appURL
        }

        setJoyIDAppURL(e) {
            this.appURL = e
        }

        getJoyIDServerURL() {
            return this.serverURL
        }

        setJoyIDServerURL(e) {
            this.serverURL = e
        }

        setNetWork(e) {
            this.network = e
        }
    }

    const _ = new ct, Y = r => {
        const {error: e, data: t} = r;
        if (e !== void 0) return r;
        const {message: i, signature: n} = t, s = {...t};
        return i && (s.message = z(O(i))), n && (s.signature = z(O(n))), {type: r.type, data: s}
    };

    class U extends Error {
        constructor(e, t) {
            super(t), this.error = e, this.error_description = t, Object.setPrototypeOf(this, U.prototype)
        }

        static fromPayload({error: e, error_description: t}) {
            return new U(e, t)
        }
    }

    class M extends U {
        constructor() {
            super("timeout", "Timeout"), Object.setPrototypeOf(this, M.prototype)
        }
    }

    class k extends M {
        constructor(e) {
            super(), this.popup = e, Object.setPrototypeOf(this, k.prototype)
        }
    }

    class R extends U {
        constructor(e) {
            super("cancelled", "Popup closed"), this.popup = e, Object.setPrototypeOf(this, R.prototype)
        }
    }

    class ae extends U {
        constructor(e) {
            super("NotSupported", "Popup is not supported in current environment"), this.popup = e, Object.setPrototypeOf(this, R.prototype)
        }
    }

    const ft = 300, X = (r = "") => {
        const i = window.screenX + (window.innerWidth - 375) / 2, n = window.screenY + (window.innerHeight - 660) / 2;
        return window.open(r, "joyid:authorize:popup", `left=${i},top=${n},width=375,height=660,resizable,scrollbars=yes,status=1`)
    }, G = r => new Promise((e, t) => {
        ge() && t(new ae(r.popup));
        let i, n;
        const s = setInterval(() => {
            r.popup && r.popup.closed && (clearInterval(s), clearTimeout(n), window.removeEventListener("message", i, !1), t(new R(r.popup)))
        }, 1e3);
        n = setTimeout(() => {
            clearInterval(s), t(new k(r.popup)), window.removeEventListener("message", i, !1)
        }, (r.timeoutInSeconds || ft) * 1e3), i = o => {
            var c;
            const a = _.getJoyIDAppURL();
            if (o.origin !== a || !o.data || ((c = o.data) == null ? void 0 : c.type) !== r.type) return;
            clearTimeout(n), clearInterval(s), window.removeEventListener("message", i, !1), r.popup.close();
            const f = Y(o.data);
            e(f)
        }, window.addEventListener("message", i)
    }), C = (r, e = "redirect") => {
        const t = _.getJoyIDAppURL(), i = new URL(`${t}/auth`);
        let n = r.redirectURL;
        if (e === "redirect") {
            const s = new URL(n);
            s.searchParams.set("joyid-redirect", "true"), n = s.href
        }
        return i.searchParams.set("type", e), i.hash = re({...r, redirectURL: n}), i.href
    }, ht = C, ut = r => {
        location.href = C(r)
    }, lt = () => {
        try {
            return Y(it(location.hash.slice(1)))
        } catch (r) {
            return {type: x.Auth, error: r instanceof Error ? r.message : r}
        }
    }, pt = async (r, e) => {
        if (e = e || {}, !e.popup && (e.popup = X(""), !e.popup)) throw new Error("Unable to open a popup for loginWithPopup - window.open returned `null`");
        e.popup.location.href = C(r, ne.Popup);
        try {
            return await G({...e, type: x.Auth})
        } catch (t) {
            return {state: r.state, type: x.Auth, error: t instanceof Error ? t.message : t}
        }
    }, b = (r, e) => {
        const t = _.getJoyIDAppURL(), i = new URL(`${t}/sign-message`);
        let n = r.redirectURL;
        if (e === "redirect") {
            const s = new URL(n);
            s.searchParams.set("joyid-redirect", "true"), n = s.href
        }
        return i.searchParams.set("type", e), i.hash = re({...r, redirectURL: n}), i.href
    }, dt = b, ce = r => {
        location.href = b(r, "redirect")
    }, yt = ce, fe = () => {
        try {
            return Y(nt(location.hash.slice(1)))
        } catch (r) {
            return {type: x.SignMessage, error: r instanceof Error ? r.message : r}
        }
    }, wt = fe, he = async (r, e) => {
        if (e = e || {}, !e.popup && (e.popup = X(""), !e.popup)) throw new Error("Unable to open a popup for loginWithPopup - window.open returned `null`");
        e.popup.location.href = b(r, "popup");
        try {
            return await G({...e, type: x.SignMessage})
        } catch (t) {
            return {state: r.state, type: x.SignMessage, error: t instanceof Error ? t.message : t}
        }
    }, vt = he;
    var N = (r => (r[r.RS256 = -257] = "RS256", r[r.ES256 = -7] = "ES256", r))(N || {});
    const ue = () => typeof process < "u" && process.versions != null && process.versions.node != null,
        le = async () => {
            var r, e, t;
            if (typeof window < "u" && ((r = window.crypto) != null && r.subtle)) return window.crypto.subtle;
            if (typeof globalThis < "u" && ((e = globalThis.crypto) != null && e.subtle)) return globalThis.crypto.subtle;
            if (ue()) {
                const i = typeof require == "function" ? require("crypto") : await import("crypto");
                if ((t = i == null ? void 0 : i.webcrypto) != null && t.subtle) return i.webcrypto.subtle
            }
            throw new Error("SubtleCrypto is not available in this environment.")
        }, pe = (r, e) => {
            try {
                const t = ve(z(e));
                return JSON.parse(t).challenge === v(we(r))
            } catch {
                return !1
            }
        }, de = async (r, e, t) => {
            const i = await le();
            try {
                const n = "RSASSA-PKCS1-v1_5", s = S(t), o = S(r), a = S(e), f = new Uint8Array(s.slice(0, 3)).reverse(),
                    c = new Uint8Array(s.slice(4)).reverse(),
                    l = {alg: "RS256", ext: !0, key_ops: ["verify"], kty: "RSA", e: v(f), n: v(c)},
                    d = await i.importKey("jwk", l, {name: n, hash: "SHA-256"}, !1, ["verify"]);
                return await i.verify(n, d, a, o)
            } catch (n) {
                return console.error(n), !1
            }
        }, ye = async ({message: r, signature: e, pubkey: t, challenge: i, alg: n}) => {
            const s = await le();
            try {
                const o = S(`${t}`), a = S(r), f = S(e), c = a.slice(0, 37), l = a.slice(37);
                if (!pe(i, l)) return !1;
                const d = await s.digest("SHA-256", l), p = T(c, d), u = n === N.ES256,
                    y = u ? {kty: "EC", crv: "P-256", x: v(o.slice(0, 32)), y: v(o.slice(32))} : {
                        alg: "RS256",
                        ext: !0,
                        key_ops: ["verify"],
                        kty: "RSA",
                        e: v(new Uint8Array(o.slice(0, 3)).reverse()),
                        n: v(new Uint8Array(o.slice(4)).reverse())
                    }, E = u ? {name: "ECDSA", namedCurve: "P-256", hash: {name: "SHA-256"}} : {
                        name: "RSASSA-PKCS1-v1_5",
                        hash: "SHA-256"
                    }, Et = await s.importKey("jwk", y, E, !1, ["verify"]);
                return await s.verify(E, Et, n === N.RS256 ? f : st(f), p)
            } catch (o) {
                return console.error(o), !1
            }
        }, gt = async r => {
            const {message: e, signature: t, pubkey: i, keyType: n} = r;
            return n === "main_key" || n === "sub_key" ? ye(r) : de(e, t, i)
        }, xt = async () => {
            if (typeof window < "u" && window.fetch) return window.fetch;
            if (ue()) {
                const r = typeof require == "function" ? require("node-fetch") : await import("node-fetch");
                if (r) return (r == null ? void 0 : r.default) || r
            }
            throw new Error("fetch is not available in this environment.")
        }, Ut = async (r, e, t, i) => {
            const n = _.getJoyIDServerURL(), s = await xt();
            try {
                return (await s(`${n}/credentials/${e}`, {method: "GET"}).then(a => a.json())).credentials.some(a => {
                    const f = i === N.RS256 || t === "main_session_key" || t === "sub_session_key" ? a.public_key : a.public_key.slice(2);
                    return a.ckb_address === e && f === r
                })
            } catch (o) {
                return console.error(o), !1
            }
        };
    h.GenericError = U, h.MAINNET_JOYID_SERVER_URL = at, h.MAINNET_JOY_ID_APP_URL = ot, h.PopupCancelledError = R, h.PopupNotSupportedError = ae, h.PopupTimeoutError = k, h.TESTNET_JOYID_SERVER_URL = oe, h.TESTNNET_JOY_ID_APP_URL = se, h.TimeoutError = M, h.authCallback = lt, h.authWithPopup = pt, h.authWithRedirect = ut, h.config = _, h.ensureChallenge = pe, h.generateAuthURL = ht, h.generateJoyIDAuthURL = C, h.generateJoyIDSignMessageURL = b, h.generateSignURL = dt, h.openPopup = X, h.runPopup = G, h.signCallback = wt, h.signMessageCallback = fe, h.signMessageWithPopup = he, h.signMessageWithRedirect = ce, h.signWithPopup = vt, h.signWithRedirect = yt, h.verifyCredential = Ut, h.verifyNativeKeySignature = ye, h.verifySessionKeySignature = de, h.verifySignature = gt, Object.defineProperty(h, Symbol.toStringTag, {value: "Module"})
});
//# sourceMappingURL=joyid-core.umd.js.map