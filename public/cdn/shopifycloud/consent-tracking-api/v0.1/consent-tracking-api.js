! function() {
    "use strict";
    let n;
    ! function(n) {
        n.TRACKING_ACCEPTED = "trackingConsentAccepted", n.TRACKING_DECLINED = "trackingConsentDeclined", n.FIRST_PARTY_MARKETING_ACCEPTED = "firstPartyMarketingConsentAccepted", n.THIRD_PARTY_MARKETING_ACCEPTED = "thirdPartyMarketingConsentAccepted", n.ANALYTICS_ACCEPTED = "analyticsConsentAccepted", n.PREFERENCES_ACCEPTED = "preferencesConsentAccepted", n.FIRST_PARTY_MARKETING_DECLINED = "firstPartyMarketingConsentDeclined", n.THIRD_PARTY_MARKETING_DECLINED = "thirdPartyMarketingConsentDeclined", n.ANALYTICS_DECLINED = "analyticsConsentDeclined", n.PREFERENCES_DECLINED = "preferencesConsentDeclined", n.CONSENT_COLLECTED = "visitorConsentCollected"
    }(n || (n = {}));
    let t, e, r, o, i, c, s;
    ! function(n) {
        n.ACCEPTED = "yes", n.DECLINED = "no", n.NO_INTERACTION = "no_interaction", n.NO_VALUE = ""
    }(t || (t = {})),
    function(n) {
        n.NO_VALUE = "", n.ACCEPTED = "1", n.DECLINED = "0"
    }(e || (e = {})),
    function(n) {
        n.GDPR = "GDPR", n.CCPA = "CCPA", n.NO_VALUE = ""
    }(r || (r = {})),
    function(n) {
        n.PREFERENCES = "p", n.ANALYTICS = "a", n.FIRST_PARTY_MARKETING = "m", n.THIRD_PARTY_MARKETING = "t"
    }(o || (o = {})),
    function(n) {
        n.GDPR = "GDPR", n.GDPR_BLOCK_ALL = "GDPR_BLOCK_ALL", n.CCPA = "CCPA"
    }(i || (i = {})),
    function(n) {
        n.MARKETING = "m", n.ANALYTICS = "a", n.PREFERENCES = "p", n.SALE_OF_DATA = "s"
    }(c || (c = {})),
    function(n) {
        n.MARKETING = "marketing", n.ANALYTICS = "analytics", n.PREFERENCES = "preferences", n.SALE_OF_DATA = "sale_of_data", n.EMAIL = "email"
    }(s || (s = {}));
    const u = ["lim", "v", "con", "reg"];
    let a = {};

    function E(n) {
        if (n in a) return a[n];
        const t = document.cookie ? document.cookie.split("; ") : [];
        a[n] = void 0;
        for (let e = 0; e < t.length; e++) {
            const [r, o] = t[e].split("=");
            if (n === decodeURIComponent(r)) {
                a[n] = JSON.parse(decodeURIComponent(o));
                break
            }
        }
        return a[n]
    }

    function C(n, t) {
        var e = Object.keys(n);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(n);
            t && (r = r.filter((function(t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable
            }))), e.push.apply(e, r)
        }
        return e
    }

    function A(n) {
        for (var t = 1; t < arguments.length; t++) {
            var e = null != arguments[t] ? arguments[t] : {};
            t % 2 ? C(Object(e), !0).forEach((function(t) {
                l(n, t, e[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)) : C(Object(e)).forEach((function(t) {
                Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(e, t))
            }))
        }
        return n
    }

    function l(n, t, e) {
        return t in n ? Object.defineProperty(n, t, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : n[t] = e, n
    }

    function f() {
        const n = E("_tracking_consent");
        if (void 0 !== n && ! function(n) {
                if ("2.1" !== n.v) return !0;
                return ! function(n, t) {
                    const e = t.slice().sort();
                    return n.length === t.length && n.slice().sort().every((n, t) => n === e[t])
                }(Object.keys(n).filter(n => "region" !== n), u)
            }(n)) return n
    }

    function T(n, t) {
        function o(n) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.NO_VALUE;
            return !0 === n ? e.ACCEPTED : !1 === n ? e.DECLINED : t
        }
        const u = {
                [c.ANALYTICS]: o(n[s.ANALYTICS], e.DECLINED),
                [c.MARKETING]: o(n[s.MARKETING], e.DECLINED),
                [c.PREFERENCES]: o(n[s.PREFERENCES], e.DECLINED),
                [c.SALE_OF_DATA]: o(n[s.SALE_OF_DATA])
            },
            E = {
                v: "2.1",
                reg: r.NO_VALUE,
                lim: [i.GDPR_BLOCK_ALL, i.CCPA],
                con: {
                    CMP: u
                }
            };
        ! function(n, t, e, r) {
            let o = "".concat(encodeURIComponent(n), "=").concat(encodeURIComponent(JSON.stringify(r)));
            o += "; path=/", o += "; domain=".concat(t), o += "; expires=".concat(new Date((new Date).getTime() + e).toUTCString()), o += "; secure", document.cookie = o, a[n] = r
        }("_tracking_consent", n.rootDomain, 31536e6, E), t(null)
    }

    function R() {
        try {
            let n = f();
            if (!n) return;
            return n
        } catch (n) {
            return
        }
    }

    function N() {
        return {
            m: I(c.MARKETING),
            a: I(c.ANALYTICS),
            p: I(c.PREFERENCES),
            s: I(c.SALE_OF_DATA)
        }
    }

    function P() {
        return N()[c.SALE_OF_DATA]
    }

    function _() {
        let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        return null === n && (n = R()), void 0 === n
    }

    function d(n) {
        switch (n) {
            case e.ACCEPTED:
                return t.ACCEPTED;
            case e.DECLINED:
                return t.DECLINED;
            default:
                return t.NO_VALUE
        }
    }

    function D(n) {
        switch (n) {
            case c.ANALYTICS:
                return s.ANALYTICS;
            case c.MARKETING:
                return s.MARKETING;
            case c.PREFERENCES:
                return s.PREFERENCES;
            case c.SALE_OF_DATA:
                return s.SALE_OF_DATA
        }
    }

    function I(n) {
        const t = R();
        if (!t) return e.NO_VALUE;
        const r = t.con.CMP;
        return r ? r[n] : e.NO_VALUE
    }

    function g() {
        return E("_cmp_a")
    }

    function p(n) {
        const t = g();
        if (!t) return !0;
        const e = t.purposes[n];
        return "boolean" != typeof e || e
    }

    function L() {
        return p(o.PREFERENCES)
    }

    function S() {
        return p(o.ANALYTICS)
    }

    function h() {
        return p(o.FIRST_PARTY_MARKETING)
    }

    function y() {
        return p(o.THIRD_PARTY_MARKETING)
    }
    const O = {
        "": [],
        GDPR: [i.GDPR, i.GDPR_BLOCK_ALL],
        CCPA: [i.CCPA]
    };

    function w(n, t) {
        document.dispatchEvent(new CustomEvent(n, {
            detail: t || {}
        }))
    }

    function m(t) {
        const e = t[o.FIRST_PARTY_MARKETING],
            r = t[o.THIRD_PARTY_MARKETING],
            i = t[o.ANALYTICS],
            c = t[o.PREFERENCES];
        !0 === e ? w(n.FIRST_PARTY_MARKETING_ACCEPTED) : !1 === e && w(n.FIRST_PARTY_MARKETING_DECLINED), !0 === r ? w(n.THIRD_PARTY_MARKETING_ACCEPTED) : !1 === r && w(n.THIRD_PARTY_MARKETING_DECLINED), !0 === i ? w(n.ANALYTICS_ACCEPTED) : !1 === i && w(n.ANALYTICS_DECLINED), !0 === c ? w(n.PREFERENCES_ACCEPTED) : !1 === c && w(n.PREFERENCES_DECLINED);
        const s = function(n) {
            return {
                firstPartyMarketingAllowed: n[o.FIRST_PARTY_MARKETING],
                thirdPartyMarketingAllowed: n[o.THIRD_PARTY_MARKETING],
                analyticsAllowed: n[o.ANALYTICS],
                preferencesAllowed: n[o.PREFERENCES]
            }
        }(t);
        w(n.CONSENT_COLLECTED, s);
        const u = [i, c, e, r];
        u.every(n => !0 === n) && w(n.TRACKING_ACCEPTED), u.every(n => !1 === n) && w(n.TRACKING_DECLINED)
    }

    function G(n, t) {
        const e = new XMLHttpRequest,
            r = JSON.stringify(n);
        e.open("POST", "/set_tracking_consent.json", !0), e.setRequestHeader("Content-Type", "application/json"), e.onreadystatechange = function() {
            if (4 !== e.readyState) return;
            a = {};
            const r = function(n) {
                try {
                    return JSON.parse(n)
                } catch (n) {
                    return {
                        error: "Unknown error"
                    }
                }
            }(e.responseText);
            var i;
            0 === (i = e.status) || 200 >= i && i < 400 ? (! function(n) {
                void 0 !== n.consent ? m({
                    [o.PREFERENCES]: n.consent,
                    [o.ANALYTICS]: n.consent,
                    [o.FIRST_PARTY_MARKETING]: n.consent,
                    [o.THIRD_PARTY_MARKETING]: n.consent
                }) : void 0 !== n.granular_consent && m({
                    [o.PREFERENCES]: L(),
                    [o.ANALYTICS]: S(),
                    [o.FIRST_PARTY_MARKETING]: h(),
                    [o.THIRD_PARTY_MARKETING]: y()
                })
            }(n), t(null, r)) : t(r)
        }, e.send(r)
    }

    function b() {
        if (_()) return t.NO_VALUE;
        const n = N();
        return n[c.MARKETING] === e.ACCEPTED && n[c.ANALYTICS] === e.ACCEPTED ? t.ACCEPTED : n[c.MARKETING] === e.DECLINED || n[c.ANALYTICS] === e.DECLINED ? t.DECLINED : t.NO_INTERACTION
    }

    function M() {
        const n = function() {
            const n = R();
            return _(n) ? r.NO_VALUE : n.reg
        }();
        return n in r ? n : r.NO_VALUE
    }

    function k() {
        return function() {
            const n = R();
            return _(n) ? {
                limit: []
            } : {
                limit: n.lim
            }
        }()
    }

    function v(n) {
        return U(i.GDPR_BLOCK_ALL) && n ? Y() ? document.referrer : "" : null
    }

    function K(n) {
        return U(i.GDPR_BLOCK_ALL) && n ? Y() ? window.location.pathname + window.location.search : "/" : null
    }

    function Y() {
        if ("" === document.referrer) return !0;
        const n = document.createElement("a");
        return n.href = document.referrer, window.location.hostname != n.hostname
    }

    function F() {
        if (!U(i.GDPR) && !U(i.GDPR_BLOCK_ALL)) return !0;
        const n = N();
        if (n[c.MARKETING] === e.ACCEPTED && n[c.ANALYTICS] === e.ACCEPTED) return !0;
        if (n[c.MARKETING] === e.DECLINED || n[c.ANALYTICS] === e.DECLINED) return !1;
        return M() !== r.GDPR
    }

    function j() {
        const n = M();
        if (n === r.NO_VALUE) return !1;
        const t = k();
        return 0 !== t.limit.length && t.limit.some(t => function(n, t) {
            return O[n].includes(t)
        }(n, t))
    }

    function B() {
        return !!_() || F()
    }

    function U(n) {
        return k().limit.includes(n)
    }

    function V() {
        return M() !== r.CCPA ? null : U(i.CCPA) ? "string" == typeof navigator.globalPrivacyControl ? "1" !== navigator.globalPrivacyControl : "boolean" == typeof navigator.globalPrivacyControl ? !navigator.globalPrivacyControl : null : null
    }

    function H() {
        return !1 === V() ? t.DECLINED : (n = P(), _() ? t.NO_VALUE : n === e.NO_VALUE ? t.NO_INTERACTION : d(n));
        var n
    }
    const q = {
        getTrackingConsent: b,
        setTrackingConsent: function(n, t) {
            if (_()) {
                const n = "Shop is not configured to block privacy regulation in online store settings.";
                return console.warn(n), t({
                    error: n
                })
            }
            if (function(n) {
                    if ("boolean" != typeof n && "object" != typeof n) throw TypeError("setTrackingConsent must be called with a boolean or object consent value");
                    if ("object" == typeof n) {
                        const t = Object.keys(n);
                        if (0 === t.length) throw TypeError("The submitted consent object is empty.");
                        const e = [s.MARKETING, s.ANALYTICS, s.PREFERENCES, s.SALE_OF_DATA, s.EMAIL];
                        for (const n of t)
                            if (!e.includes(n)) throw TypeError("The submitted consent object should only contain the following keys: ".concat(e.join(", "), "."))
                    }
                }(n), "function" != typeof t) throw TypeError("setTrackingConsent must be called with a callback function");
            if ("object" == typeof n) {
                const e = v(n.analytics),
                    r = K(n.analytics);
                return G(A(A({
                    granular_consent: n
                }, null !== e && {
                    referrer: e
                }), null !== r && {
                    landing_page: r
                }), t)
            } {
                const e = v(n),
                    r = K(n);
                return G(A(A({
                    consent: n
                }, null !== e && {
                    referrer: e
                }), null !== r && {
                    landing_page: r
                }), t)
            }
        },
        userCanBeTracked: B,
        getRegulation: M,
        isRegulationEnforced: j,
        getShopPrefs: k,
        shouldShowGDPRBanner: function() {
            return M() === r.GDPR && j() && b() === t.NO_INTERACTION
        },
        userDataCanBeSold: function() {
            const n = V(),
                t = function() {
                    if (U(i.CCPA)) {
                        return P() !== e.DECLINED
                    }
                    return !0
                }();
            return null !== n && !1 !== t ? n : !!_() || !1 !== B() && t
        },
        setCCPAConsent: function(n, t) {
            if ("boolean" != typeof n) throw TypeError("setCCPAConsent must be called with a boolean consent value");
            if ("function" != typeof t) throw TypeError("setCCPAConsent must be called with a callback function");
            return G({
                ccpa_consent: n
            }, t)
        },
        getCCPAConsent: H,
        GPCSignal: V,
        shouldShowCCPABanner: function() {
            return M() === r.CCPA && k().limit.includes(i.CCPA) && H() === t.NO_INTERACTION
        },
        haveAnalyticsConsent: function() {
            return S()
        },
        havePreferencesConsent: function() {
            return L()
        },
        haveFirstPartyMarketingConsent: function() {
            return h()
        },
        haveThirdPartyMarketingConsent: function() {
            return y()
        },
        getCCPAConsentValue: P,
        merchantEnforcingRegulationLimit: U,
        shouldShowBanner: function() {
            return function() {
                const n = g();
                return !!n && ("boolean" == typeof n.display_banner && n.display_banner)
            }() && I(c.ANALYTICS) === e.NO_VALUE && I(c.MARKETING) === e.NO_VALUE && I(c.PREFERENCES) === e.NO_VALUE
        },
        saleOfDataRegion: function() {
            return function() {
                const n = g();
                return n && n.sale_of_data_region || !1
            }()
        }
    };

    function x(n, t, e) {
        try {
            var r;
            ! function(n) {
                const t = new XMLHttpRequest;
                t.open("POST", "https://notify.bugsnag.com/", !0), t.setRequestHeader("Content-Type", "application/json"), t.setRequestHeader("Bugsnag-Api-Key", "95ba910bcec4542ef2a0b64cd7ca666c"), t.setRequestHeader("Bugsnag-Payload-Version", "5");
                const e = function(n) {
                    const t = function(n) {
                            return n.stackTrace || n.stack || n.description || n.name
                        }(n.error),
                        [e, r] = (t || "unknown error").split("\n")[0].split(":");
                    return JSON.stringify({
                        payloadVersion: 5,
                        notifier: {
                            name: "ConsentTrackingAPI",
                            version: "latest",
                            url: "-"
                        },
                        events: [{
                            exceptions: [{
                                errorClass: (e || "").trim(),
                                message: (r || "").trim(),
                                stacktrace: [{
                                    file: "consent-tracking-api.js",
                                    lineNumber: "1",
                                    method: t
                                }],
                                type: "browserjs"
                            }],
                            context: n.context || "general",
                            app: {
                                id: "ConsentTrackingAPI",
                                version: "latest"
                            },
                            metaData: {
                                request: {
                                    shopId: n.shopId,
                                    shopUrl: window.location.href
                                },
                                device: {
                                    userAgent: window.navigator.userAgent
                                },
                                "Additional Notes": n.notes
                            },
                            unhandled: !1
                        }]
                    })
                }(n);
                t.send(e)
            }({
                error: n,
                context: t,
                shopId: X() || (null === (r = window.Shopify) || void 0 === r ? void 0 : r.shop),
                notes: e
            })
        } catch (n) {}
    }

    function J(n) {
        return function() {
            try {
                return n(...arguments)
            } catch (n) {
                throw x(n), n
            }
        }
    }

    function X() {
        try {
            const n = document.getElementById("shopify-features").textContent;
            return JSON.parse(n).shopId
        } catch (n) {
            return null
        }
    }

    function z() {
        return q.getTrackingConsent()
    }

    function Q(n, t) {
        return "object" == typeof n && n.headlessStorefront ? T(n, t) : q.setTrackingConsent(n, t)
    }

    function W() {
        return q.userCanBeTracked()
    }

    function Z() {
        return q.getRegulation()
    }

    function $() {
        return q.isRegulationEnforced()
    }

    function nn() {
        return q.getShopPrefs()
    }

    function tn() {
        return q.shouldShowGDPRBanner()
    }

    function en() {
        return q.userDataCanBeSold()
    }

    function rn(n, t) {
        return q.setCCPAConsent(n, t)
    }

    function on() {
        return q.getCCPAConsent()
    }

    function cn() {
        return q.shouldShowCCPABanner()
    }

    function sn() {
        return q.haveAnalyticsConsent()
    }

    function un() {
        return q.havePreferencesConsent()
    }

    function an() {
        return q.haveFirstPartyMarketingConsent()
    }

    function En() {
        return q.haveThirdPartyMarketingConsent()
    }

    function Cn() {
        return q.shouldShowBanner()
    }

    function An() {
        return q.saleOfDataRegion()
    }

    function ln() {
        return !0
    }

    function fn() {
        const n = {},
            t = N();
        for (const e of Object.keys(t)) n[D(e)] = d(t[e]);
        return n
    }

    function Tn() {
        q.getCCPAConsentValue() != e.DECLINED && !1 === q.GPCSignal() && rn(!1, () => !1);
        return {
            getTrackingConsent: J(z),
            setTrackingConsent: J(Q),
            userCanBeTracked: J(W),
            getRegulation: J(Z),
            isRegulationEnforced: J($),
            getShopPrefs: J(nn),
            shouldShowGDPRBanner: J(tn),
            userDataCanBeSold: J(en),
            setCCPAConsent: J(rn),
            getCCPAConsent: J(on),
            shouldShowCCPABanner: J(cn),
            doesMerchantSupportGranularConsent: J(ln),
            analyticsProcessingAllowed: J(sn),
            preferencesProcessingAllowed: J(un),
            firstPartyMarketingAllowed: J(an),
            thirdPartyMarketingAllowed: J(En),
            currentVisitorConsent: J(fn),
            shouldShowBanner: J(Cn),
            saleOfDataRegion: J(An),
            unstable: {
                analyticsProcessingAllowed: sn,
                preferencesProcessingAllowed: un,
                firstPartyMarketingAllowed: an,
                thirdPartyMarketingAllowed: En,
                currentVisitorConsent: fn,
                shouldShowBanner: Cn,
                saleOfDataRegion: An
            }
        }
    }
    window.Shopify = window.Shopify ? window.Shopify : {}, window.Shopify.customerPrivacy = window.Shopify.trackingConsent = Tn()
}();
//# sourceMappingURL=consent-tracking-api.js.map