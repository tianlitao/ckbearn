(function (c, w) {
    typeof exports == "object" && typeof module < "u" ? w(exports) : typeof define == "function" && define.amd ? define(["exports"], w) : (c = typeof globalThis < "u" ? globalThis : c || self, w(c.joyCKB = {}))
})(this, function (c) {
    "use strict";

    function w(t) {
        const e = new Uint8Array(t);
        let r = "";
        for (let n = 0; n < e.length; n++) {
            const o = e[n];
            r += String.fromCharCode(o)
        }
        return btoa(r).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
    }

    function $(t) {
        return [...new Uint8Array(t)].map(e => e.toString(16).padStart(2, "0")).join("")
    }

    function G(t) {
        return t.startsWith("0x") ? t.slice(2) : t
    }

    var F = 4294967295;

    function j(t, e, r) {
        var i = r / 4294967296, n = r;
        t.setUint32(e, i), t.setUint32(e + 4, n)
    }

    function N(t, e, r) {
        var i = Math.floor(r / 4294967296), n = r;
        t.setUint32(e, i), t.setUint32(e + 4, n)
    }

    function Q(t, e) {
        var r = t.getInt32(e), i = t.getUint32(e + 4);
        return r * 4294967296 + i
    }

    var A, b, C,
        g = (typeof process > "u" || ((A = process == null ? void 0 : process.env) === null || A === void 0 ? void 0 : A.TEXT_ENCODING) !== "never") && typeof TextEncoder < "u" && typeof TextDecoder < "u";

    function W(t) {
        for (var e = t.length, r = 0, i = 0; i < e;) {
            var n = t.charCodeAt(i++);
            if (n & 4294967168) if (!(n & 4294965248)) r += 2; else {
                if (n >= 55296 && n <= 56319 && i < e) {
                    var o = t.charCodeAt(i);
                    (o & 64512) === 56320 && (++i, n = ((n & 1023) << 10) + (o & 1023) + 65536)
                }
                n & 4294901760 ? r += 4 : r += 3
            } else {
                r++;
                continue
            }
        }
        return r
    }

    function Z(t, e, r) {
        for (var i = t.length, n = r, o = 0; o < i;) {
            var s = t.charCodeAt(o++);
            if (s & 4294967168) if (!(s & 4294965248)) e[n++] = s >> 6 & 31 | 192; else {
                if (s >= 55296 && s <= 56319 && o < i) {
                    var f = t.charCodeAt(o);
                    (f & 64512) === 56320 && (++o, s = ((s & 1023) << 10) + (f & 1023) + 65536)
                }
                s & 4294901760 ? (e[n++] = s >> 18 & 7 | 240, e[n++] = s >> 12 & 63 | 128, e[n++] = s >> 6 & 63 | 128) : (e[n++] = s >> 12 & 15 | 224, e[n++] = s >> 6 & 63 | 128)
            } else {
                e[n++] = s;
                continue
            }
            e[n++] = s & 63 | 128
        }
    }

    var y = g ? new TextEncoder : void 0,
        Y = g ? typeof process < "u" && ((b = process == null ? void 0 : process.env) === null || b === void 0 ? void 0 : b.TEXT_ENCODING) !== "force" ? 200 : 0 : F;

    function q(t, e, r) {
        e.set(y.encode(t), r)
    }

    function ee(t, e, r) {
        y.encodeInto(t, e.subarray(r))
    }

    var te = y != null && y.encodeInto ? ee : q;
    g && new TextDecoder, g && typeof process < "u" && ((C = process == null ? void 0 : process.env) === null || C === void 0 || C.TEXT_DECODER);
    var x = function () {
        function t(e, r) {
            this.type = e, this.data = r
        }

        return t
    }(), re = globalThis && globalThis.__extends || function () {
        var t = function (e, r) {
            return t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (i, n) {
                i.__proto__ = n
            } || function (i, n) {
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (i[o] = n[o])
            }, t(e, r)
        };
        return function (e, r) {
            if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
            t(e, r);

            function i() {
                this.constructor = e
            }

            e.prototype = r === null ? Object.create(r) : (i.prototype = r.prototype, new i)
        }
    }(), ie = function (t) {
        re(e, t);

        function e(r) {
            var i = t.call(this, r) || this, n = Object.create(e.prototype);
            return Object.setPrototypeOf(i, n), Object.defineProperty(i, "name", {
                configurable: !0,
                enumerable: !1,
                value: e.name
            }), i
        }

        return e
    }(Error), ne = -1, oe = 4294967296 - 1, se = 17179869184 - 1;

    function fe(t) {
        var e = t.sec, r = t.nsec;
        if (e >= 0 && r >= 0 && e <= se) if (r === 0 && e <= oe) {
            var i = new Uint8Array(4), n = new DataView(i.buffer);
            return n.setUint32(0, e), i
        } else {
            var o = e / 4294967296, s = e & 4294967295, i = new Uint8Array(8), n = new DataView(i.buffer);
            return n.setUint32(0, r << 2 | o & 3), n.setUint32(4, s), i
        } else {
            var i = new Uint8Array(12), n = new DataView(i.buffer);
            return n.setUint32(0, r), N(n, 4, e), i
        }
    }

    function ae(t) {
        var e = t.getTime(), r = Math.floor(e / 1e3), i = (e - r * 1e3) * 1e6, n = Math.floor(i / 1e9);
        return {sec: r + n, nsec: i - n * 1e9}
    }

    function ce(t) {
        if (t instanceof Date) {
            var e = ae(t);
            return fe(e)
        } else return null
    }

    function he(t) {
        var e = new DataView(t.buffer, t.byteOffset, t.byteLength);
        switch (t.byteLength) {
            case 4: {
                var r = e.getUint32(0), i = 0;
                return {sec: r, nsec: i}
            }
            case 8: {
                var n = e.getUint32(0), o = e.getUint32(4), r = (n & 3) * 4294967296 + o, i = n >>> 2;
                return {sec: r, nsec: i}
            }
            case 12: {
                var r = Q(e, 4), i = e.getUint32(0);
                return {sec: r, nsec: i}
            }
            default:
                throw new ie("Unrecognized data size for timestamp (expected 4, 8, or 12): ".concat(t.length))
        }
    }

    function pe(t) {
        var e = he(t);
        return new Date(e.sec * 1e3 + e.nsec / 1e6)
    }

    var ue = {type: ne, encode: ce, decode: pe}, de = function () {
        function t() {
            this.builtInEncoders = [], this.builtInDecoders = [], this.encoders = [], this.decoders = [], this.register(ue)
        }

        return t.prototype.register = function (e) {
            var r = e.type, i = e.encode, n = e.decode;
            if (r >= 0) this.encoders[r] = i, this.decoders[r] = n; else {
                var o = 1 + r;
                this.builtInEncoders[o] = i, this.builtInDecoders[o] = n
            }
        }, t.prototype.tryToEncode = function (e, r) {
            for (var i = 0; i < this.builtInEncoders.length; i++) {
                var n = this.builtInEncoders[i];
                if (n != null) {
                    var o = n(e, r);
                    if (o != null) {
                        var s = -1 - i;
                        return new x(s, o)
                    }
                }
            }
            for (var i = 0; i < this.encoders.length; i++) {
                var n = this.encoders[i];
                if (n != null) {
                    var o = n(e, r);
                    if (o != null) {
                        var s = i;
                        return new x(s, o)
                    }
                }
            }
            return e instanceof x ? e : null
        }, t.prototype.decode = function (e, r, i) {
            var n = r < 0 ? this.builtInDecoders[-1 - r] : this.decoders[r];
            return n ? n(e, r, i) : new x(r, e)
        }, t.defaultCodec = new t, t
    }();

    function le(t) {
        return t instanceof Uint8Array ? t : ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t instanceof ArrayBuffer ? new Uint8Array(t) : Uint8Array.from(t)
    }

    var we = 100, ye = 2048, ve = function () {
        function t(e, r, i, n, o, s, f, a) {
            e === void 0 && (e = de.defaultCodec), r === void 0 && (r = void 0), i === void 0 && (i = we), n === void 0 && (n = ye), o === void 0 && (o = !1), s === void 0 && (s = !1), f === void 0 && (f = !1), a === void 0 && (a = !1), this.extensionCodec = e, this.context = r, this.maxDepth = i, this.initialBufferSize = n, this.sortKeys = o, this.forceFloat32 = s, this.ignoreUndefined = f, this.forceIntegerToFloat = a, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer)
        }

        return t.prototype.reinitializeState = function () {
            this.pos = 0
        }, t.prototype.encodeSharedRef = function (e) {
            return this.reinitializeState(), this.doEncode(e, 1), this.bytes.subarray(0, this.pos)
        }, t.prototype.encode = function (e) {
            return this.reinitializeState(), this.doEncode(e, 1), this.bytes.slice(0, this.pos)
        }, t.prototype.doEncode = function (e, r) {
            if (r > this.maxDepth) throw new Error("Too deep objects in depth ".concat(r));
            e == null ? this.encodeNil() : typeof e == "boolean" ? this.encodeBoolean(e) : typeof e == "number" ? this.encodeNumber(e) : typeof e == "string" ? this.encodeString(e) : this.encodeObject(e, r)
        }, t.prototype.ensureBufferSizeToWrite = function (e) {
            var r = this.pos + e;
            this.view.byteLength < r && this.resizeBuffer(r * 2)
        }, t.prototype.resizeBuffer = function (e) {
            var r = new ArrayBuffer(e), i = new Uint8Array(r), n = new DataView(r);
            i.set(this.bytes), this.view = n, this.bytes = i
        }, t.prototype.encodeNil = function () {
            this.writeU8(192)
        }, t.prototype.encodeBoolean = function (e) {
            e === !1 ? this.writeU8(194) : this.writeU8(195)
        }, t.prototype.encodeNumber = function (e) {
            Number.isSafeInteger(e) && !this.forceIntegerToFloat ? e >= 0 ? e < 128 ? this.writeU8(e) : e < 256 ? (this.writeU8(204), this.writeU8(e)) : e < 65536 ? (this.writeU8(205), this.writeU16(e)) : e < 4294967296 ? (this.writeU8(206), this.writeU32(e)) : (this.writeU8(207), this.writeU64(e)) : e >= -32 ? this.writeU8(224 | e + 32) : e >= -128 ? (this.writeU8(208), this.writeI8(e)) : e >= -32768 ? (this.writeU8(209), this.writeI16(e)) : e >= -2147483648 ? (this.writeU8(210), this.writeI32(e)) : (this.writeU8(211), this.writeI64(e)) : this.forceFloat32 ? (this.writeU8(202), this.writeF32(e)) : (this.writeU8(203), this.writeF64(e))
        }, t.prototype.writeStringHeader = function (e) {
            if (e < 32) this.writeU8(160 + e); else if (e < 256) this.writeU8(217), this.writeU8(e); else if (e < 65536) this.writeU8(218), this.writeU16(e); else if (e < 4294967296) this.writeU8(219), this.writeU32(e); else throw new Error("Too long string: ".concat(e, " bytes in UTF-8"))
        }, t.prototype.encodeString = function (e) {
            var r = 5, i = e.length;
            if (i > Y) {
                var n = W(e);
                this.ensureBufferSizeToWrite(r + n), this.writeStringHeader(n), te(e, this.bytes, this.pos), this.pos += n
            } else {
                var n = W(e);
                this.ensureBufferSizeToWrite(r + n), this.writeStringHeader(n), Z(e, this.bytes, this.pos), this.pos += n
            }
        }, t.prototype.encodeObject = function (e, r) {
            var i = this.extensionCodec.tryToEncode(e, this.context);
            if (i != null) this.encodeExtension(i); else if (Array.isArray(e)) this.encodeArray(e, r); else if (ArrayBuffer.isView(e)) this.encodeBinary(e); else if (typeof e == "object") this.encodeMap(e, r); else throw new Error("Unrecognized object: ".concat(Object.prototype.toString.apply(e)))
        }, t.prototype.encodeBinary = function (e) {
            var r = e.byteLength;
            if (r < 256) this.writeU8(196), this.writeU8(r); else if (r < 65536) this.writeU8(197), this.writeU16(r); else if (r < 4294967296) this.writeU8(198), this.writeU32(r); else throw new Error("Too large binary: ".concat(r));
            var i = le(e);
            this.writeU8a(i)
        }, t.prototype.encodeArray = function (e, r) {
            var i = e.length;
            if (i < 16) this.writeU8(144 + i); else if (i < 65536) this.writeU8(220), this.writeU16(i); else if (i < 4294967296) this.writeU8(221), this.writeU32(i); else throw new Error("Too large array: ".concat(i));
            for (var n = 0, o = e; n < o.length; n++) {
                var s = o[n];
                this.doEncode(s, r + 1)
            }
        }, t.prototype.countWithoutUndefined = function (e, r) {
            for (var i = 0, n = 0, o = r; n < o.length; n++) {
                var s = o[n];
                e[s] !== void 0 && i++
            }
            return i
        }, t.prototype.encodeMap = function (e, r) {
            var i = Object.keys(e);
            this.sortKeys && i.sort();
            var n = this.ignoreUndefined ? this.countWithoutUndefined(e, i) : i.length;
            if (n < 16) this.writeU8(128 + n); else if (n < 65536) this.writeU8(222), this.writeU16(n); else if (n < 4294967296) this.writeU8(223), this.writeU32(n); else throw new Error("Too large map object: ".concat(n));
            for (var o = 0, s = i; o < s.length; o++) {
                var f = s[o], a = e[f];
                this.ignoreUndefined && a === void 0 || (this.encodeString(f), this.doEncode(a, r + 1))
            }
        }, t.prototype.encodeExtension = function (e) {
            var r = e.data.length;
            if (r === 1) this.writeU8(212); else if (r === 2) this.writeU8(213); else if (r === 4) this.writeU8(214); else if (r === 8) this.writeU8(215); else if (r === 16) this.writeU8(216); else if (r < 256) this.writeU8(199), this.writeU8(r); else if (r < 65536) this.writeU8(200), this.writeU16(r); else if (r < 4294967296) this.writeU8(201), this.writeU32(r); else throw new Error("Too large extension object: ".concat(r));
            this.writeI8(e.type), this.writeU8a(e.data)
        }, t.prototype.writeU8 = function (e) {
            this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, e), this.pos++
        }, t.prototype.writeU8a = function (e) {
            var r = e.length;
            this.ensureBufferSizeToWrite(r), this.bytes.set(e, this.pos), this.pos += r
        }, t.prototype.writeI8 = function (e) {
            this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, e), this.pos++
        }, t.prototype.writeU16 = function (e) {
            this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, e), this.pos += 2
        }, t.prototype.writeI16 = function (e) {
            this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, e), this.pos += 2
        }, t.prototype.writeU32 = function (e) {
            this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, e), this.pos += 4
        }, t.prototype.writeI32 = function (e) {
            this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, e), this.pos += 4
        }, t.prototype.writeF32 = function (e) {
            this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, e), this.pos += 4
        }, t.prototype.writeF64 = function (e) {
            this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, e), this.pos += 8
        }, t.prototype.writeU64 = function (e) {
            this.ensureBufferSizeToWrite(8), j(this.view, this.pos, e), this.pos += 8
        }, t.prototype.writeI64 = function (e) {
            this.ensureBufferSizeToWrite(8), N(this.view, this.pos, e), this.pos += 8
        }, t
    }(), Ue = {};

    function ge(t, e) {
        e === void 0 && (e = Ue);
        var r = new ve(e.extensionCodec, e.context, e.maxDepth, e.initialBufferSize, e.sortKeys, e.forceFloat32, e.ignoreUndefined, e.forceIntegerToFloat);
        return r.encodeSharedRef(t)
    }

    const xe = t => w(ge(t, {ignoreUndefined: !0}));
    var B = (t => (t.Auth = "Auth", t.SignMessage = "SignMessage", t.TransferCotaNFT = "TransferCotaNFT", t.TransferMNFT = "TransferMNFT", t.TransferCKB = "TransferCKB", t.SignEvm = "SignEvm", t.SignCkbTx = "SignCkbTx", t.SignCotaNFT = "SignCotaNFT", t))(B || {});

    function P(t) {
        const e = t.replace(/-/g, "+").replace(/_/g, "/"), r = (4 - e.length % 4) % 4, i = e.padEnd(e.length + r, "="),
            n = atob(i), o = new ArrayBuffer(n.length), s = new Uint8Array(o);
        for (let f = 0; f < n.length; f++) s[f] = n.charCodeAt(f);
        return o
    }

    function Te(t) {
        const e = new Uint8Array(t);
        let r = "";
        for (let i = 0; i < e.length; i++) {
            const n = e[i];
            r += String.fromCharCode(n)
        }
        return btoa(r).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
    }

    function _(t) {
        return [...new Uint8Array(t)].map(e => e.toString(16).padStart(2, "0")).join("")
    }

    function Ee() {
        return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone
    }

    var M = 4294967295;

    function Se(t, e, r) {
        var i = r / 4294967296, n = r;
        t.setUint32(e, i), t.setUint32(e + 4, n)
    }

    function V(t, e, r) {
        var i = Math.floor(r / 4294967296), n = r;
        t.setUint32(e, i), t.setUint32(e + 4, n)
    }

    function me(t, e) {
        var r = t.getInt32(e), i = t.getUint32(e + 4);
        return r * 4294967296 + i
    }

    var z, D, L,
        T = (typeof process > "u" || ((z = process == null ? void 0 : process.env) === null || z === void 0 ? void 0 : z.TEXT_ENCODING) !== "never") && typeof TextEncoder < "u" && typeof TextDecoder < "u";

    function K(t) {
        for (var e = t.length, r = 0, i = 0; i < e;) {
            var n = t.charCodeAt(i++);
            if (n & 4294967168) if (!(n & 4294965248)) r += 2; else {
                if (n >= 55296 && n <= 56319 && i < e) {
                    var o = t.charCodeAt(i);
                    (o & 64512) === 56320 && (++i, n = ((n & 1023) << 10) + (o & 1023) + 65536)
                }
                n & 4294901760 ? r += 4 : r += 3
            } else {
                r++;
                continue
            }
        }
        return r
    }

    function Ie(t, e, r) {
        for (var i = t.length, n = r, o = 0; o < i;) {
            var s = t.charCodeAt(o++);
            if (s & 4294967168) if (!(s & 4294965248)) e[n++] = s >> 6 & 31 | 192; else {
                if (s >= 55296 && s <= 56319 && o < i) {
                    var f = t.charCodeAt(o);
                    (f & 64512) === 56320 && (++o, s = ((s & 1023) << 10) + (f & 1023) + 65536)
                }
                s & 4294901760 ? (e[n++] = s >> 18 & 7 | 240, e[n++] = s >> 12 & 63 | 128, e[n++] = s >> 6 & 63 | 128) : (e[n++] = s >> 12 & 15 | 224, e[n++] = s >> 6 & 63 | 128)
            } else {
                e[n++] = s;
                continue
            }
            e[n++] = s & 63 | 128
        }
    }

    var E = T ? new TextEncoder : void 0,
        Ae = T ? typeof process < "u" && ((D = process == null ? void 0 : process.env) === null || D === void 0 ? void 0 : D.TEXT_ENCODING) !== "force" ? 200 : 0 : M;

    function be(t, e, r) {
        e.set(E.encode(t), r)
    }

    function Ce(t, e, r) {
        E.encodeInto(t, e.subarray(r))
    }

    var Be = E != null && E.encodeInto ? Ce : be, ze = 4096;

    function De(t, e, r) {
        for (var i = e, n = i + r, o = [], s = ""; i < n;) {
            var f = t[i++];
            if (!(f & 128)) o.push(f); else if ((f & 224) === 192) {
                var a = t[i++] & 63;
                o.push((f & 31) << 6 | a)
            } else if ((f & 240) === 224) {
                var a = t[i++] & 63, h = t[i++] & 63;
                o.push((f & 31) << 12 | a << 6 | h)
            } else if ((f & 248) === 240) {
                var a = t[i++] & 63, h = t[i++] & 63, Ut = t[i++] & 63, l = (f & 7) << 18 | a << 12 | h << 6 | Ut;
                l > 65535 && (l -= 65536, o.push(l >>> 10 & 1023 | 55296), l = 56320 | l & 1023), o.push(l)
            } else o.push(f);
            o.length >= ze && (s += String.fromCharCode.apply(String, o), o.length = 0)
        }
        return o.length > 0 && (s += String.fromCharCode.apply(String, o)), s
    }

    T && new TextDecoder, T && typeof process < "u" && ((L = process == null ? void 0 : process.env) === null || L === void 0 || L.TEXT_DECODER);
    var S = function () {
        function t(e, r) {
            this.type = e, this.data = r
        }

        return t
    }(), Le = globalThis && globalThis.__extends || function () {
        var t = function (e, r) {
            return t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (i, n) {
                i.__proto__ = n
            } || function (i, n) {
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (i[o] = n[o])
            }, t(e, r)
        };
        return function (e, r) {
            if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
            t(e, r);

            function i() {
                this.constructor = e
            }

            e.prototype = r === null ? Object.create(r) : (i.prototype = r.prototype, new i)
        }
    }(), Oe = function (t) {
        Le(e, t);

        function e(r) {
            var i = t.call(this, r) || this, n = Object.create(e.prototype);
            return Object.setPrototypeOf(i, n), Object.defineProperty(i, "name", {
                configurable: !0,
                enumerable: !1,
                value: e.name
            }), i
        }

        return e
    }(Error), Re = -1, Fe = 4294967296 - 1, Ne = 17179869184 - 1;

    function We(t) {
        var e = t.sec, r = t.nsec;
        if (e >= 0 && r >= 0 && e <= Ne) if (r === 0 && e <= Fe) {
            var i = new Uint8Array(4), n = new DataView(i.buffer);
            return n.setUint32(0, e), i
        } else {
            var o = e / 4294967296, s = e & 4294967295, i = new Uint8Array(8), n = new DataView(i.buffer);
            return n.setUint32(0, r << 2 | o & 3), n.setUint32(4, s), i
        } else {
            var i = new Uint8Array(12), n = new DataView(i.buffer);
            return n.setUint32(0, r), V(n, 4, e), i
        }
    }

    function Pe(t) {
        var e = t.getTime(), r = Math.floor(e / 1e3), i = (e - r * 1e3) * 1e6, n = Math.floor(i / 1e9);
        return {sec: r + n, nsec: i - n * 1e9}
    }

    function _e(t) {
        if (t instanceof Date) {
            var e = Pe(t);
            return We(e)
        } else return null
    }

    function Me(t) {
        var e = new DataView(t.buffer, t.byteOffset, t.byteLength);
        switch (t.byteLength) {
            case 4: {
                var r = e.getUint32(0), i = 0;
                return {sec: r, nsec: i}
            }
            case 8: {
                var n = e.getUint32(0), o = e.getUint32(4), r = (n & 3) * 4294967296 + o, i = n >>> 2;
                return {sec: r, nsec: i}
            }
            case 12: {
                var r = me(e, 4), i = e.getUint32(0);
                return {sec: r, nsec: i}
            }
            default:
                throw new Oe("Unrecognized data size for timestamp (expected 4, 8, or 12): ".concat(t.length))
        }
    }

    function Ve(t) {
        var e = Me(t);
        return new Date(e.sec * 1e3 + e.nsec / 1e6)
    }

    var Ke = {type: Re, encode: _e, decode: Ve}, Xe = function () {
        function t() {
            this.builtInEncoders = [], this.builtInDecoders = [], this.encoders = [], this.decoders = [], this.register(Ke)
        }

        return t.prototype.register = function (e) {
            var r = e.type, i = e.encode, n = e.decode;
            if (r >= 0) this.encoders[r] = i, this.decoders[r] = n; else {
                var o = 1 + r;
                this.builtInEncoders[o] = i, this.builtInDecoders[o] = n
            }
        }, t.prototype.tryToEncode = function (e, r) {
            for (var i = 0; i < this.builtInEncoders.length; i++) {
                var n = this.builtInEncoders[i];
                if (n != null) {
                    var o = n(e, r);
                    if (o != null) {
                        var s = -1 - i;
                        return new S(s, o)
                    }
                }
            }
            for (var i = 0; i < this.encoders.length; i++) {
                var n = this.encoders[i];
                if (n != null) {
                    var o = n(e, r);
                    if (o != null) {
                        var s = i;
                        return new S(s, o)
                    }
                }
            }
            return e instanceof S ? e : null
        }, t.prototype.decode = function (e, r, i) {
            var n = r < 0 ? this.builtInDecoders[-1 - r] : this.decoders[r];
            return n ? n(e, r, i) : new S(r, e)
        }, t.defaultCodec = new t, t
    }();

    function Je(t) {
        return t instanceof Uint8Array ? t : ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t instanceof ArrayBuffer ? new Uint8Array(t) : Uint8Array.from(t)
    }

    var ke = 100, He = 2048, $e = function () {
        function t(e, r, i, n, o, s, f, a) {
            e === void 0 && (e = Xe.defaultCodec), r === void 0 && (r = void 0), i === void 0 && (i = ke), n === void 0 && (n = He), o === void 0 && (o = !1), s === void 0 && (s = !1), f === void 0 && (f = !1), a === void 0 && (a = !1), this.extensionCodec = e, this.context = r, this.maxDepth = i, this.initialBufferSize = n, this.sortKeys = o, this.forceFloat32 = s, this.ignoreUndefined = f, this.forceIntegerToFloat = a, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer)
        }

        return t.prototype.reinitializeState = function () {
            this.pos = 0
        }, t.prototype.encodeSharedRef = function (e) {
            return this.reinitializeState(), this.doEncode(e, 1), this.bytes.subarray(0, this.pos)
        }, t.prototype.encode = function (e) {
            return this.reinitializeState(), this.doEncode(e, 1), this.bytes.slice(0, this.pos)
        }, t.prototype.doEncode = function (e, r) {
            if (r > this.maxDepth) throw new Error("Too deep objects in depth ".concat(r));
            e == null ? this.encodeNil() : typeof e == "boolean" ? this.encodeBoolean(e) : typeof e == "number" ? this.encodeNumber(e) : typeof e == "string" ? this.encodeString(e) : this.encodeObject(e, r)
        }, t.prototype.ensureBufferSizeToWrite = function (e) {
            var r = this.pos + e;
            this.view.byteLength < r && this.resizeBuffer(r * 2)
        }, t.prototype.resizeBuffer = function (e) {
            var r = new ArrayBuffer(e), i = new Uint8Array(r), n = new DataView(r);
            i.set(this.bytes), this.view = n, this.bytes = i
        }, t.prototype.encodeNil = function () {
            this.writeU8(192)
        }, t.prototype.encodeBoolean = function (e) {
            e === !1 ? this.writeU8(194) : this.writeU8(195)
        }, t.prototype.encodeNumber = function (e) {
            Number.isSafeInteger(e) && !this.forceIntegerToFloat ? e >= 0 ? e < 128 ? this.writeU8(e) : e < 256 ? (this.writeU8(204), this.writeU8(e)) : e < 65536 ? (this.writeU8(205), this.writeU16(e)) : e < 4294967296 ? (this.writeU8(206), this.writeU32(e)) : (this.writeU8(207), this.writeU64(e)) : e >= -32 ? this.writeU8(224 | e + 32) : e >= -128 ? (this.writeU8(208), this.writeI8(e)) : e >= -32768 ? (this.writeU8(209), this.writeI16(e)) : e >= -2147483648 ? (this.writeU8(210), this.writeI32(e)) : (this.writeU8(211), this.writeI64(e)) : this.forceFloat32 ? (this.writeU8(202), this.writeF32(e)) : (this.writeU8(203), this.writeF64(e))
        }, t.prototype.writeStringHeader = function (e) {
            if (e < 32) this.writeU8(160 + e); else if (e < 256) this.writeU8(217), this.writeU8(e); else if (e < 65536) this.writeU8(218), this.writeU16(e); else if (e < 4294967296) this.writeU8(219), this.writeU32(e); else throw new Error("Too long string: ".concat(e, " bytes in UTF-8"))
        }, t.prototype.encodeString = function (e) {
            var r = 5, i = e.length;
            if (i > Ae) {
                var n = K(e);
                this.ensureBufferSizeToWrite(r + n), this.writeStringHeader(n), Be(e, this.bytes, this.pos), this.pos += n
            } else {
                var n = K(e);
                this.ensureBufferSizeToWrite(r + n), this.writeStringHeader(n), Ie(e, this.bytes, this.pos), this.pos += n
            }
        }, t.prototype.encodeObject = function (e, r) {
            var i = this.extensionCodec.tryToEncode(e, this.context);
            if (i != null) this.encodeExtension(i); else if (Array.isArray(e)) this.encodeArray(e, r); else if (ArrayBuffer.isView(e)) this.encodeBinary(e); else if (typeof e == "object") this.encodeMap(e, r); else throw new Error("Unrecognized object: ".concat(Object.prototype.toString.apply(e)))
        }, t.prototype.encodeBinary = function (e) {
            var r = e.byteLength;
            if (r < 256) this.writeU8(196), this.writeU8(r); else if (r < 65536) this.writeU8(197), this.writeU16(r); else if (r < 4294967296) this.writeU8(198), this.writeU32(r); else throw new Error("Too large binary: ".concat(r));
            var i = Je(e);
            this.writeU8a(i)
        }, t.prototype.encodeArray = function (e, r) {
            var i = e.length;
            if (i < 16) this.writeU8(144 + i); else if (i < 65536) this.writeU8(220), this.writeU16(i); else if (i < 4294967296) this.writeU8(221), this.writeU32(i); else throw new Error("Too large array: ".concat(i));
            for (var n = 0, o = e; n < o.length; n++) {
                var s = o[n];
                this.doEncode(s, r + 1)
            }
        }, t.prototype.countWithoutUndefined = function (e, r) {
            for (var i = 0, n = 0, o = r; n < o.length; n++) {
                var s = o[n];
                e[s] !== void 0 && i++
            }
            return i
        }, t.prototype.encodeMap = function (e, r) {
            var i = Object.keys(e);
            this.sortKeys && i.sort();
            var n = this.ignoreUndefined ? this.countWithoutUndefined(e, i) : i.length;
            if (n < 16) this.writeU8(128 + n); else if (n < 65536) this.writeU8(222), this.writeU16(n); else if (n < 4294967296) this.writeU8(223), this.writeU32(n); else throw new Error("Too large map object: ".concat(n));
            for (var o = 0, s = i; o < s.length; o++) {
                var f = s[o], a = e[f];
                this.ignoreUndefined && a === void 0 || (this.encodeString(f), this.doEncode(a, r + 1))
            }
        }, t.prototype.encodeExtension = function (e) {
            var r = e.data.length;
            if (r === 1) this.writeU8(212); else if (r === 2) this.writeU8(213); else if (r === 4) this.writeU8(214); else if (r === 8) this.writeU8(215); else if (r === 16) this.writeU8(216); else if (r < 256) this.writeU8(199), this.writeU8(r); else if (r < 65536) this.writeU8(200), this.writeU16(r); else if (r < 4294967296) this.writeU8(201), this.writeU32(r); else throw new Error("Too large extension object: ".concat(r));
            this.writeI8(e.type), this.writeU8a(e.data)
        }, t.prototype.writeU8 = function (e) {
            this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, e), this.pos++
        }, t.prototype.writeU8a = function (e) {
            var r = e.length;
            this.ensureBufferSizeToWrite(r), this.bytes.set(e, this.pos), this.pos += r
        }, t.prototype.writeI8 = function (e) {
            this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, e), this.pos++
        }, t.prototype.writeU16 = function (e) {
            this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, e), this.pos += 2
        }, t.prototype.writeI16 = function (e) {
            this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, e), this.pos += 2
        }, t.prototype.writeU32 = function (e) {
            this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, e), this.pos += 4
        }, t.prototype.writeI32 = function (e) {
            this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, e), this.pos += 4
        }, t.prototype.writeF32 = function (e) {
            this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, e), this.pos += 4
        }, t.prototype.writeF64 = function (e) {
            this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, e), this.pos += 8
        }, t.prototype.writeU64 = function (e) {
            this.ensureBufferSizeToWrite(8), Se(this.view, this.pos, e), this.pos += 8
        }, t.prototype.writeI64 = function (e) {
            this.ensureBufferSizeToWrite(8), V(this.view, this.pos, e), this.pos += 8
        }, t
    }(), Ge = {};

    function je(t, e) {
        e === void 0 && (e = Ge);
        var r = new $e(e.extensionCodec, e.context, e.maxDepth, e.initialBufferSize, e.sortKeys, e.forceFloat32, e.ignoreUndefined, e.forceIntegerToFloat);
        return r.encodeSharedRef(t)
    }

    var Qe = 16, Ze = 16, Ye = function () {
        function t(e, r) {
            e === void 0 && (e = Qe), r === void 0 && (r = Ze), this.maxKeyLength = e, this.maxLengthPerKey = r, this.hit = 0, this.miss = 0, this.caches = [];
            for (var i = 0; i < this.maxKeyLength; i++) this.caches.push([])
        }

        return t.prototype.canBeCached = function (e) {
            return e > 0 && e <= this.maxKeyLength
        }, t.prototype.find = function (e, r, i) {
            var n = this.caches[i - 1];
            e:for (var o = 0, s = n; o < s.length; o++) {
                for (var f = s[o], a = f.bytes, h = 0; h < i; h++) if (a[h] !== e[r + h]) continue e;
                return f.str
            }
            return null
        }, t.prototype.store = function (e, r) {
            var i = this.caches[e.length - 1], n = {bytes: e, str: r};
            i.length >= this.maxLengthPerKey ? i[Math.random() * i.length | 0] = n : i.push(n)
        }, t.prototype.decode = function (e, r, i) {
            var n = this.find(e, r, i);
            if (n != null) return this.hit++, n;
            this.miss++;
            var o = De(e, r, i), s = Uint8Array.prototype.slice.call(e, r, r + i);
            return this.store(s, o), o
        }, t
    }(), X = new DataView(new ArrayBuffer(0));
    new Uint8Array(X.buffer);
    var qe = function () {
        try {
            X.getInt8(0)
        } catch (t) {
            return t.constructor
        }
        throw new Error("never reached")
    }();
    new qe("Insufficient data"), new Ye;
    const J = t => Te(je(t, {ignoreUndefined: !0}));
    var v = (t => (t.Auth = "Auth", t.SignMessage = "SignMessage", t.TransferCotaNFT = "TransferCotaNFT", t.TransferMNFT = "TransferMNFT", t.TransferCKB = "TransferCKB", t.SignEvm = "SignEvm", t.SignCkbTx = "SignCkbTx", t.SignCotaNFT = "SignCotaNFT", t))(v || {}),
        k = (t => (t.Popup = "popup", t.Redirect = "redirect", t))(k || {});
    const et = "https://app.joyid.dev", tt = "https://api.joyid.dev/api/v1";

    class rt {
        constructor() {
            this.appURL = et, this.serverURL = tt, this.network = "testnet"
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

    const p = new rt, it = t => {
        const {error: e, data: r} = t;
        if (e !== void 0) return t;
        const {message: i, signature: n} = r, o = {...r};
        return i && (o.message = _(P(i))), n && (o.signature = _(P(n))), {type: t.type, data: o}
    };

    class d extends Error {
        constructor(e, r) {
            super(r), this.error = e, this.error_description = r, Object.setPrototypeOf(this, d.prototype)
        }

        static fromPayload({error: e, error_description: r}) {
            return new d(e, r)
        }
    }

    class O extends d {
        constructor() {
            super("timeout", "Timeout"), Object.setPrototypeOf(this, O.prototype)
        }
    }

    class R extends O {
        constructor(e) {
            super(), this.popup = e, Object.setPrototypeOf(this, R.prototype)
        }
    }

    class m extends d {
        constructor(e) {
            super("cancelled", "Popup closed"), this.popup = e, Object.setPrototypeOf(this, m.prototype)
        }
    }

    class nt extends d {
        constructor(e) {
            super("NotSupported", "Popup is not supported in current environment"), this.popup = e, Object.setPrototypeOf(this, m.prototype)
        }
    }

    const ot = 300, U = (t = "") => {
        const e = window.screenX + (window.innerWidth - 375) / 2, r = window.screenY + (window.innerHeight - 660) / 2;
        return window.open(t, "joyid:authorize:popup", `left=${e},top=${r},width=375,height=660,resizable,scrollbars=yes,status=1`)
    }, I = t => new Promise((e, r) => {
        Ee() && r(new nt(t.popup));
        let i, n;
        const o = setInterval(() => {
            t.popup && t.popup.closed && (clearInterval(o), clearTimeout(n), window.removeEventListener("message", i, !1), r(new m(t.popup)))
        }, 1e3);
        n = setTimeout(() => {
            clearInterval(o), r(new R(t.popup)), window.removeEventListener("message", i, !1)
        }, (t.timeoutInSeconds || ot) * 1e3), i = s => {
            var f;
            const a = p.getJoyIDAppURL();
            if (s.origin !== a || !s.data || ((f = s.data) == null ? void 0 : f.type) !== t.type) return;
            clearTimeout(n), clearInterval(o), window.removeEventListener("message", i, !1), t.popup.close();
            const h = it(s.data);
            e(h)
        }, window.addEventListener("message", i)
    }), st = (t, e = "redirect") => {
        const r = p.getJoyIDAppURL(), i = new URL(`${r}/auth`);
        let n = t.redirectURL;
        if (e === "redirect") {
            const o = new URL(n);
            o.searchParams.set("joyid-redirect", "true"), n = o.href
        }
        return i.searchParams.set("type", e), i.hash = J({...t, redirectURL: n}), i.href
    }, ft = async (t, e) => {
        if (e = e || {}, !e.popup && (e.popup = U(""), !e.popup)) throw new Error("Unable to open a popup for loginWithPopup - window.open returned `null`");
        e.popup.location.href = st(t, k.Popup);
        try {
            return await I({...e, type: v.Auth})
        } catch (r) {
            return {state: t.state, type: v.Auth, error: r instanceof Error ? r.message : r}
        }
    }, at = (t, e) => {
        const r = p.getJoyIDAppURL(), i = new URL(`${r}/sign-message`);
        let n = t.redirectURL;
        if (e === "redirect") {
            const o = new URL(n);
            o.searchParams.set("joyid-redirect", "true"), n = o.href
        }
        return i.searchParams.set("type", e), i.hash = J({...t, redirectURL: n}), i.href
    }, ct = async (t, e) => {
        if (e = e || {}, !e.popup && (e.popup = U(""), !e.popup)) throw new Error("Unable to open a popup for loginWithPopup - window.open returned `null`");
        e.popup.location.href = at(t, "popup");
        try {
            return await I({...e, type: v.SignMessage})
        } catch (r) {
            return {state: t.state, type: v.SignMessage, error: r instanceof Error ? r.message : r}
        }
    }, ht = ct, u = {joyidAppURL: p.getJoyIDAppURL(), joyidServerURL: p.getJoyIDServerURL()}, pt = t => {
        if (!t) return t;
        const e = G(t);
        return e.length === 48 ? `ffffffff${e}` : e
    }, H = (t, e = !0) => {
        const {joyidAppURL: r, joyidServerURL: i, ...n} = t, o = e ? "sign-ckb" : "sign-cota-nft", s = n;
        if (!e) {
            const a = s.tx;
            a.tokenKey = pt(a.tokenKey), s.tx = a
        }
        const f = new URL(`${r}/${o}`);
        return f.searchParams.set("type", "popup"), f.hash = xe(s), f.href
    }, ut = t => {
        const {joyidAppURL: e, joyidServerURL: r} = t || {};
        return e && p.setJoyIDAppURL(e), r && p.setJoyIDServerURL(r), Object.assign(u, t), u
    }, dt = () => u, lt = async t => {
        t = {...u, ...t};
        const e = await ft({redirectURL: location.href, ...t});
        if (e.error != null) throw new Error(e.error);
        return e.data
    }, wt = async (t, e, r) => {
        const i = typeof t != "string";
        r = {...u, ...r};
        const n = await ht({
            challenge: typeof t != "string" ? $(t) : t,
            isData: i,
            address: e,
            redirectURL: location.href, ...r
        });
        if (n.error != null) throw new Error(n.error);
        return n.data
    }, yt = async (t, e) => {
        if (e = {...u, ...e}, !e.popup && (e.popup = U(""), !e.popup)) throw new Error("Unable to open a popup for loginWithPopup - window.open returned `null`");
        const {popup: r, timeoutInSeconds: i, ...n} = e;
        e.popup.location.href = H({...n, tx: t, signerAddress: t.from, redirectURL: location.href});
        const o = await I({timeoutInSeconds: i || 5e3, popup: r, type: B.SignCkbTx});
        if (o.error != null) throw new Error(o.error);
        return o.data.tx
    }, vt = async (t, e) => {
        if (e = {...u, ...e}, !e.popup && (e.popup = U(""), !e.popup)) throw new Error("Unable to open a popup for loginWithPopup - window.open returned `null`");
        const {popup: r, timeoutInSeconds: i, ...n} = e;
        e.popup.location.href = H({...n, tx: t, signerAddress: t.from, redirectURL: location.href}, !1);
        const o = await I({timeoutInSeconds: i || 5e3, popup: r, type: B.SignCotaNFT});
        if (o.error != null) throw new Error(o.error);
        return o.data.tx
    };
    c.connect = lt, c.getConfig = dt, c.initConfig = ut, c.openPopup = U, c.signChallenge = wt, c.signCotaNFTTx = vt, c.signTransaction = yt, Object.defineProperty(c, Symbol.toStringTag, {value: "Module"})
});
//# sourceMappingURL=joyid-ckb.umd.js.map