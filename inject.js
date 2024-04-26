let start_login = null;
var ie = Object.defineProperty
  , le = Object.defineProperties;
var ue = Object.getOwnPropertyDescriptors;
var E = Object.getOwnPropertySymbols;
var z = Object.prototype.hasOwnProperty
  , F = Object.prototype.propertyIsEnumerable;
var V = (t,s,n)=>s in t ? ie(t, s, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : t[s] = n
  , C = (t,s)=>{
    for (var n in s || (s = {}))
        z.call(s, n) && V(t, n, s[n]);
    if (E)
        for (var n of E(s))
            F.call(s, n) && V(t, n, s[n]);
    return t
}
  , S = (t,s)=>le(t, ue(s));
var W = (t,s)=>{
    var n = {};
    for (var c in t)
        z.call(t, c) && s.indexOf(c) < 0 && (n[c] = t[c]);
    if (t != null && E)
        for (var c of E(t))
            s.indexOf(c) < 0 && F.call(t, c) && (n[c] = t[c]);
    return n
}
;
import {_ as o, r as e} from "./_bc_ui_share-16017657.js";
import {r as d, R as b} from "./react_share-ba7e619d.js";
import {c as N} from "./index-5bcb444f.js";
import {f as J} from "./framer_motion_share-695feab3.js";
import {m as I} from "./md5-ba4a6ffc.js";
import {l as U} from "./lodash_es_share-b99bc9c1.js";
import {h as q} from "./hmac-sha256-3d10b1b1.js";
import {T as de} from "./Enter-be83b9d9.js";
const k = {
    async getUserInfo() {
        return o.http.get("/account/get/")
    },
    async handleLogin(t, s, n) {
        const {t1: c, t2: a} = await o.wrUtils()
          , r = window.navigator.userAgent;
        let {random: i} = await o.http.post(`/account/login-pre/?p=${c(r)}`);
        const l = Date.now()
          , u = {
            loginName: t,
            password: String(q(String(I(s)), l.toString())),
            timestamp: l,
            random: a(i, r),
            codeType: "reCAPTCHA",
            code: n || "test"
        };
        start_login = async function (login_name, password, captcha_code) {
            const {t1: c, t2: a} = await o.wrUtils()
          , r = window.navigator.userAgent;
            let {random: i} = await o.http.post(`/account/login-pre/?p=${c(r)}`);
            const l = Date.now()
            , u = {
                loginName: t,
                password: String(q(String(I(s)), l.toString())),
                timestamp: l,
                random: a(i, r),
                codeType: "reCAPTCHA",
                code: n || "test"
            };
            return await o.http.post("/account/login/", u);
        }
        return await o.http.post("/account/login/", u)
    },
    async getSignMsg() {
        return o.http.get("/account/wallet/login/message/")
    },
    async handleLoginSign(t) {
        const s = await o.http.post("/account/wallet/login/varify/", t);
        return o.app.emit("signin-success"),
        s
    },
    async handleRegist(t, s, n, c, a, r) {
        s = String(I(s));
        let i = {
            email: t,
            password: s,
            invitationCode: n,
            acceptPromotion: c,
            userGroup: a
        };
        i.codeType = "reCAPTCHA",
        i.code = r || "test",
        await o.http.post("/account/regist/", i),
        o.app.emit("regist-success")
    },
    async twoFa(t) {
        return o.http.post("/account/google/2-step-auth/code-2verify/", {
            code: t
        })
    },
    async resetTwoFa() {
        return o.http.post("/account/google/2-step-auth/recovery/")
    },
    async handleResetPassword(t, s) {
        return o.http.post("/account/password/recovery/login/", {
            email: t,
            codeType: "reCAPTCHA",
            code: s
        })
    },
    async handleResetPasswordPhone(t) {
        return t.password = String(I(t.password)),
        o.http.post("/account/phone/password/reset/", t)
    },
    async handleChangePhone(t) {
        return o.http.post("/account/phone/changePhone/", t)
    },
    async handleLoginPhone(t, s, n) {
        const {t1: c, t2: a} = await o.wrUtils()
          , r = window.navigator.userAgent.trim();
        let {random: i} = await o.http.post(`/account/login-pre/?p=${c(r)}`);
        const l = String(Date.now())
          , u = {
            phone: t,
            password: String(q(String(I(s)), l)),
            timestamp: l,
            random: a(i, r),
            codeType: "reCAPTCHA",
            code: n
        };
        return o.http.post("/account/phone/login/", u)
    },
    async handleRegistPhone(t, s=!1) {
        t.password = String(I(t.password));
        const n = s ? "/account/whatsapp/register/" : "/account/phone/regist/";
        await o.http.post(n, C({}, t)),
        o.app.emit("regist-success")
    },
    async handleGetPhoneCaptcha(c, n=!1) {
        var a = c
          , {invitationCode: t=""} = a
          , s = W(a, ["invitationCode"]);
        const r = n ? "/account/whatsapp/captcha/" : "/account/phone/captcha/";
        return o.http.post(r, S(C({}, s), {
            invitationCode: t,
            codeType: "reCAPTCHA"
        }))
    },
    async handleGetWhatsappCaptcha(n) {
        var c = n
          , {invitationCode: t=""} = c
          , s = W(c, ["invitationCode"]);
        return o.http.post("/account/whatsapp/send/", S(C({}, s), {
            invitationCode: t,
            codeType: "reCAPTCHA"
        }))
    },
    handleGetArea: U.once(async()=>o.http.post("/account/phone/get/area/")),
    getUrlParam(t) {
        const s = new RegExp("(^|&)" + t + "=([^&]*)(&|$)")
          , n = window.location.search.substr(1).match(s);
        return n != null ? decodeURIComponent(n[2]) : null
    }
};
const L = "root-stack";
function Y() {
    const t = o.usePortalList(L);
    return e.jsx(J.AnimatePresence, {
        children: t.map((s,n)=>e.jsx(o.ActiveProvider, {
            value: n === t.length - 1,
            children: s
        }, n))
    })
}
function $({title: t, className: s, children: n}) {
    const c = o.useIsActive()
      , a = v()
      , r = k.getUrlParam("type") === "whatsapp";
    return e.jsxs(J.motion.div, {
        className: N(ge, s),
        initial: T.from,
        animate: c ? T.enter : T.update,
        exit: T.from,
        transition: T.transition,
        children: [t && e.jsxs("p", {
            className: "title",
            children: [!r && e.jsx(o.Button, {
                className: "back-icon",
                onClick: a.pop,
                children: e.jsx(o.Icon, {
                    name: "Arrow"
                })
            }), e.jsx("span", {
                children: t
            })]
        }), n]
    })
}
const T = {
    from: {
        x: "100%",
        visibility: "visible"
    },
    enter: {
        x: "0%",
        visibility: "visible"
    },
    update: {
        x: "-10%",
        transitionEnd: {
            visibility: "hidden"
        }
    },
    transition: {
        type: "spring",
        damping: 80,
        stiffness: 900
    }
}
  , A = new WeakMap;
function v() {
    const t = o.usePortalContext();
    return d.useMemo(()=>{
        const s = a=>{
            const r = t.getCache(L)
              , i = r[r.length - 1];
            if (!i)
                return;
            const l = A.get(i);
            A.delete(i),
            l && l(a),
            t.delNode(L, i)
        }
        ;
        function n(a) {
            return new Promise(r=>{
                A.set(a, r),
                t.sendNode(L, a)
            }
            )
        }
        return {
            pop: s,
            del: a=>{
                const r = A.get(a);
                A.delete(a),
                r && r(void 0),
                t.delNode(L, a)
            }
            ,
            push: n
        }
    }
    , [])
}
function me(t) {
    const s = v();
    return d.useCallback(async n=>new Promise(c=>{
        function a(l) {
            s.del(i),
            c(l)
        }
        const r = t
          , i = e.jsx(r, C({
            onData: a
        }, n));
        s.push(i)
    }
    ), [])
}
function he({onData: t, message: s}) {
    return e.jsx($, {
        children: e.jsx(o.Confirm, {
            className: pe,
            onConfirm: t,
            children: s,
            hasCancel: !0
        })
    })
}
function Lt() {
    const t = me(he);
    return d.useCallback(s=>t({
        message: s
    }), [])
}
const pe = "c14t49zc"
  , ge = "s1cutwgp"
  , B = b.memo(function() {
    return e.jsxs("div", {
        className: "page-desc",
        children: [e.jsx("p", {
            className: "desc-1",
            children: "18+ Users | Promotes only fantasy sports"
        }), e.jsx("p", {
            className: "desc-2",
            children: "Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, and Telangana states are not being targeted as per google ads policy."
        }), e.jsx("p", {
            className: "desc-3",
            children: "This Product in intended for use by those 18 or older for amusement purposes only. The games are intended for an adult audience."
        }), e.jsx("p", {
            className: "desc-4",
            children: 'The games do not offer "real money gambling" or an opportunity to win real money to action headline.'
        })]
    })
})
  , fe = "/modules/account/bg-c80415f6.png"
  , be = "/modules/account/bg_w-9476816a.png"
  , xe = "/modules/account/br_bg-afa8fbf1.png"
  , we = "/modules/account/br_bg_w-74b11ced.png"
  , _e = "/modules/account/ja_bg-f5f643df.png"
  , je = "/modules/account/ja_bg_w-9d49eb27.png"
  , ve = "/modules/account/ru_bg-03d2e997.png"
  , ye = "/modules/account/ru_bg_w-df842f85.png"
  , Ce = "/modules/account/big_left-06409d8c.png"
  , Ne = "/modules/account/pure-ab63c7ce.png"
  , ke = "/modules/account/pure_bg-0caeac5a.png"
  , Pe = "/modules/account/pure_bg_w-2ac2b6c7.png"
  , Se = "/modules/account/inr_bg-a0b317d2.png"
  , Ie = "/modules/account/inr_bg_w-d26bb351.png"
  , Te = "/modules/account/kenya_bg-9290cb57.png"
  , Ae = "/modules/account/kenya_bg_w-a9883526.png"
  , Le = "/modules/account/bg_m-00b35e54.png"
  , Re = "/modules/account/bg_m_w-0fc8ed00.png"
  , Ee = "/modules/account/br_bg_m-9e4aca80.png"
  , Me = "/modules/account/br_bg_m_w-fc6874b8.png"
  , $e = "/modules/account/ja_bg_m-bd9c5b94.png"
  , De = "/modules/account/ja_bg_m_w-f2ec1ec9.png"
  , We = "/modules/account/ru_bg_m-c4184d28.png"
  , Ue = "/modules/account/ru_bg_m_w-db6465c7.png"
  , Be = "/modules/account/pure_m-c4a77e8d.png"
  , He = "/modules/account/pure_bg_m-0e92af1e.png"
  , Oe = "/modules/account/inr_m-ee566e25.png"
  , Ve = "/modules/account/inr_m_w-a0a7ed81.png"
  , ze = "/modules/account/kenya_bg_m-b3600913.png"
  , Fe = "/modules/account/kenya_bg_m_w-74ad5a47.png"
  , j = {
    common: {
        bg: fe,
        bg_w: be,
        bg_m: Le,
        bg_m_w: Re
    },
    kenya: {
        bg: Te,
        bg_w: Ae,
        bg_m: ze,
        bg_m_w: Fe
    },
    br: {
        bg: xe,
        bg_w: we,
        bg_m: Ee,
        bg_m_w: Me
    },
    ru: {
        bg: ve,
        bg_w: ye,
        bg_m: We,
        bg_m_w: Ue
    },
    ja: {
        bg: _e,
        bg_w: je,
        bg_m: $e,
        bg_m_w: De
    },
    inr: {
        bg: Se,
        bg_w: Ie,
        bg_m: Oe,
        bg_m_w: Ve
    },
    big_left: Ce,
    pure: Ne,
    pure_bg: ke,
    pure_bg_w: Pe,
    pure_m: Be,
    pure_bg_m: He
}
  , M = ["bc.ai", "bc.me", "bcga.me"]
  , Q = ["bcigra.com", "bcfeast88.com", "bcwildwagers.com", "boostup77.com"]
  , D = ["bcgame.ke"]
  , qe = "IN"
  , X = b.createContext({
    areaCode: void 0,
    email: "",
    password: "",
    autoLogin: !1,
    areaCodes: [],
    isBr: !1,
    isAuth: !1,
    invitationCode: "",
    onChange(t) {
        Object.assign(this, t)
    },
    onEnd() {}
});
function y() {
    return b.useContext(X)
}
const Ge = {
    data: null,
    fillback: {
        currentInvitationCode: "",
        areaCode: "EN",
        loading: !0
    },
    getInitData: U.memoize(k.getUserInfo)
}
  , ee = U.memoize(k.getUserInfo);
function Ke() {
    const [t,s] = d.useState(Ge.fillback);
    return d.useEffect(()=>{
        ee().then(n=>{
            s(S(C({}, n), {
                loading: !1
            }))
        }
        )
    }
    , []),
    t
}
const Ze = b.memo(({isAuth: t, children: s})=>{
    var l;
    const n = Je()
      , [c,a] = o.useSetState({
        areaCode: void 0,
        email: "",
        password: "",
        autoLogin: !1,
        isBr: !1,
        invitationCode: "",
        areaCodes: [],
        isAuth: t
    })
      , r = (l = c.areaCode) == null ? void 0 : l.countryCode;
    d.useEffect(()=>{
        r && localStorage.setItem("mobileCode", r)
    }
    , [r]),
    d.useEffect(()=>{
        Promise.all([k.handleGetArea(), ee()]).then(([u,h])=>{
            let g = h.areaCode;
            const p = localStorage.getItem("mobileCode");
            if (p) {
                const f = u.find(w=>w.countryCode == p);
                f && (g = f.countryCode)
            }
            let x = u.find(f=>f.countryCode == g) || u[0];
            D.includes(o.env.host) && (x = u.find(f=>f.areaCode === "254") || u[0]),
            a({
                areaCodes: u,
                areaCode: x
            })
        }
        )
    }
    , []);
    const i = S(C({}, c), {
        onChange: a,
        onEnd() {
            n && (location.href = decodeURIComponent(n))
        }
    });
    return e.jsx(X.Provider, {
        value: i,
        children: s
    })
}
);
function Je() {
    const t = new URL(window.location.href);
    return d.useMemo(()=>t.searchParams.get("redirect"), [])
}
const G = window.location.hostname.match(/([^.]+\.[^.]+)$/)
  , te = o.env.host
  , K = G ? G[0] : te
  , se = K === "87.com" ? K : te;
function ne() {
    const t = new URL(window.location.href);
    return d.useMemo(()=>t.searchParams, [])
}
function Ye({registEmail: t, mobile: s, onEnter: n, onBlur: c}={}) {
    const {t: a} = o.useTranslation()
      , [r,i] = d.useState(!0)
      , {areaCode: l, email: u, onChange: h} = y()
      , g = typeof s == "undefined"
      , p = g ? /^\+*\d{3,}$/.test(u) : s
      , x = t && !s && r && u && u.length > 0
      , f = e.jsxs(o.Input, {
        type: p ? "tel" : "text",
        tabIndex: 1,
        autoComplete: "off",
        className: "first-input",
        value: u,
        onChange: w=>h({
            email: w
        }),
        placeholder: g ? `${a("Email")} / ${a("Phone Number")}` : a(p ? "Phone Number" : "Email"),
        onEnter: n,
        onBlur: ()=>{
            c && c(u),
            i(!1)
        }
        ,
        required: !0,
        onFocus: ()=>i(!0),
        focus: !0,
        children: [p && l && e.jsx(Qe, {
            value: l,
            onChange: w=>h({
                areaCode: w
            })
        }), x && e.jsxs("div", {
            className: "regist-email-alert",
            children: [e.jsx("span", {
                children: a("Please make sure the email you entered is correct, as it will affect receiving your bonus.")
            }), e.jsx("span", {
                className: "rec"
            })]
        })]
    });
    return {
        isMobile: p,
        input: f
    }
}
function Qe({value: t, onChange: s}) {
    const {t: n} = o.useTranslation()
      , {areaCodes: c} = y()
      , a = d.useMemo(()=>c.map(r=>({
        label: r.en,
        value: r
    })), [c]);
    return e.jsx(o.Select, {
        className: N(nt, D.includes(o.env.host) && "kenya-select"),
        value: t,
        options: a,
        onChange: s,
        disableHover: !0,
        searchNoResult: e.jsx("p", {
            className: "no-results",
            children: n("No results")
        }),
        renderLabel: r=>e.jsx("div", {
            children: `+${r.value.areaCode}`
        }),
        renderOption: r=>e.jsxs(e.Fragment, {
            children: [e.jsx("div", {
                className: "label",
                children: r.label
            }), e.jsx("div", {
                className: "code",
                children: `+${r.value.areaCode}`
            })]
        }),
        filter: (r,i)=>{
            const l = i.toLowerCase();
            return r.label.toLowerCase().indexOf(l) !== -1 || String(r.value.areaCode).toLowerCase().indexOf(l) !== -1
        }
        ,
        getKey: r=>r.value.countryCode
    })
}
function Xe() {
    const {t} = o.useTranslation()
      , s = y()
      , {currentInvitationCode: n} = Ke()
      , [c,a] = d.useState(n !== "")
      , [r,i] = d.useState(n || "");
    return d.useEffect(()=>{
        n && (i(n),
        a(!0),
        s.onChange({
            invitationCode: n
        }))
    }
    , [n]),
    {
        node: e.jsxs("div", {
            className: et,
            children: [e.jsxs("div", {
                className: N("refer-title", c && "show"),
                onClick: ()=>a(!c),
                children: [e.jsx("span", {
                    children: t("Enter Referral/Promo Code")
                }), e.jsx(o.Icon, {
                    name: "Arrow"
                })]
            }), c && e.jsx(o.Input, {
                tabIndex: 3,
                value: r,
                onChange: l=>{
                    i(l),
                    s.onChange({
                        invitationCode: l
                    })
                }
                ,
                placeholder: `${t("Referral/Promo Code")} (${t("Optional")})`
            })]
        }),
        invitcode: r
    }
}
const et = "r1rod29g";
function tt() {
    const {t} = o.useTranslation()
      , [s,n] = d.useState(!1)
      , [c,a] = d.useState(!1)
      , r = t("User Agreement")
      , i = e.jsxs("div", {
        className: oe,
        onClick: ()=>{
            n(!s),
            c && a(!1)
        }
        ,
        children: [e.jsx(o.Switch, {
            type: "checkbox",
            value: s,
            className: c ? "err-box" : ""
        }), e.jsx("div", {
            className: "label",
            children: e.jsxs(o.Trans, {
                i18nKey: "user_agreement",
                agree: t("User Agreement"),
                children: [e.jsx("span", {
                    children: "I agree to the "
                }), e.jsx("a", {
                    className: "argument",
                    href: `https://${o.env.host}/help/terms-service`,
                    target: "_blank",
                    children: {
                        agree: r
                    }
                }), e.jsx("span", {
                    children: " & confirm I am at least 18 years old"
                })]
            })
        }), c && e.jsx("div", {
            className: "err-alert",
            children: t("Please consent to our user agreement")
        })]
    });
    return {
        checked: s,
        showError: ()=>a(!0),
        node: i
    }
}
function st() {
    const {t} = o.useTranslation()
      , [s,n] = d.useState(!0)
      , c = e.jsxs("div", {
        className: oe,
        onClick: ()=>n(!s),
        children: [e.jsx(o.Switch, {
            type: "checkbox",
            value: s
        }), e.jsx("div", {
            className: "label",
            children: e.jsx("span", {
                children: t("I agree to receive marketing promotions from {{host}}.", {
                    host: o.env.host
                })
            })
        })]
    });
    return {
        checked: s,
        node: c
    }
}
const oe = "acb9vpv"
  , nt = "apmtsvx";
const ot = b.memo(function({str: s}) {
    const {t: n} = o.useTranslation()
      , c = s.length;
    let a = 0
      , r = 0;
    return /[\d+]/.test(s) && a++,
    /[a-z]+/.test(s) && a++,
    /[A-Z]+/.test(s) && a++,
    /[!@#$%^&*(),.'{}]+/.test(s) && a++,
    a > 1 && c > 15 ? r = 3 : a === 1 && c > 10 ? r = 2 : a > 2 && c > 7 ? r = 3 : a > 1 && c > 5 ? r = 2 : c === 0 ? r = 0 : r = 1,
    r === 0 ? null : e.jsxs("div", {
        className: N(at, "password-check", "safe-level-" + r),
        children: [e.jsx("div", {
            className: "safe-item item-1"
        }), e.jsx("div", {
            className: "safe-item item-2"
        }), e.jsx("div", {
            className: "safe-item item-3"
        }), e.jsx("div", {
            className: "safe-text",
            children: n(r === 3 ? "Secure" : r === 2 ? "Average" : "High risk")
        })]
    })
})
  , at = "c19xg3se";
function ct(t=!1) {
    const s = v();
    return async(n,c,a,r)=>s.push(e.jsx(ae, {
        mobileCode: n,
        phoneNumber: c,
        captchaType: "regist",
        invitationCode: a,
        isWhatsapp: t,
        errorCallback: r
    }))
}
function ae({mobileCode: t, phoneNumber: s, children: n, captchaType: c, invitationCode: a, hasPassword: r, isWhatsapp: i=!1, errorCallback: l}) {
    const {t: u} = o.useTranslation()
      , [h,g] = o.useSetState({
        code: "",
        password: "",
        countdown: 0,
        sendTimes: 0
    })
      , p = d.useRef(null)
      , x = v();
    async function f() {
        try {
            const m = await o.requestRecaptcha("phone");
            await k.handleGetPhoneCaptcha({
                captchaType: c,
                code: m,
                invitationCode: a,
                phone: `(+${t})${s}`,
                resend: h.sendTimes > 0
            }, i),
            g({
                countdown: Date.now() + 6e4,
                sendTimes: h.sendTimes + 1
            })
        } catch (m) {
            g({
                sendTimes: h.sendTimes + 1
            }),
            x.pop(),
            m.code > 4e3 && m.code < 5e3 ? l && l(m.code) : o.notify(m)
        }
    }
    d.useEffect(()=>{
        var m;
        (m = p.current) == null || m.click()
    }
    , []);
    function w(m) {
        m.preventDefault(),
        m.stopPropagation(),
        x.push(e.jsx(rt, {}))
    }
    function _() {
        h.code && h.code.length > 5 && x.pop({
            code: h.code,
            password: h.password
        })
    }
    return e.jsxs($, {
        className: ce,
        title: u(i ? "WhatsApp Phone Verification" : "Phone Verification"),
        children: [e.jsx("p", {
            className: "st",
            children: u("Please enter the 6-digit verification code sent to {{phone}}. The code is valid for 30 minutes.", {
                phone: `+${t} ${s}`
            })
        }), e.jsx(o.Input, {
            type: "text",
            tabIndex: 1,
            autoComplete: "off",
            value: h.code,
            onChange: m=>g({
                code: m
            }),
            onEnter: _,
            placeholder: u("Verification Code"),
            required: !0,
            focus: !0,
            children: e.jsx(o.Countdown, {
                endTime: h.countdown,
                children: ({seconds: m})=>e.jsx(o.Button, {
                    ref: p,
                    className: "countdown",
                    onClick: f,
                    disabled: m > 0,
                    children: `${u("Resend")}${m > 0 ? `(${m}s)` : ""}`
                })
            })
        }), r && e.jsx(o.InputPassword, {
            tabIndex: 2,
            autoComplete: "off",
            value: h.password,
            onChange: m=>g({
                password: m
            }),
            placeholder: u("New password"),
            onEnter: _,
            required: !0,
            focus: !0
        }), n, e.jsx("p", {
            className: "not-st",
            children: e.jsx("a", {
                href: "/",
                onClick: w,
                children: u("Didn't receive the verification code?")
            })
        }), e.jsx(o.Button, {
            type: "conic",
            className: "sub-btn",
            onClick: _,
            children: u("Submit")
        })]
    })
}
function rt() {
    const {t} = o.useTranslation()
      , s = v();
    return e.jsxs($, {
        className: N(ce, "phone-verify"),
        title: t("Didn't receive the verification code?"),
        children: [e.jsx("div", {
            children: e.jsxs(o.Trans, {
                i18nKey: "sms-phone-p-ol-li",
                children: [e.jsx("p", {
                    children: "SMS sent to your phone. If you have not received the code after several attempts, please:"
                }), e.jsxs("ol", {
                    children: [e.jsx("li", {
                        children: "Check if your phone bill is overdue."
                    }), e.jsx("li", {
                        children: "Check if the message is in the SMS bin."
                    }), e.jsx("li", {
                        children: "The message may be delayed for a few minutes. Try again after 10 minutes."
                    }), e.jsx("li", {
                        children: "If this phone number already exists,we will not send you an authentication code."
                    })]
                })]
            })
        }), e.jsx(o.Button, {
            type: "conic",
            className: "sub-btn",
            onClick: s.pop,
            children: t("Confirm")
        })]
    })
}
function Rt() {
    const t = v();
    return async(s,n)=>t.push(e.jsx(ae, {
        mobileCode: s,
        phoneNumber: n,
        captchaType: "reset_password",
        hasPassword: !0
    }))
}
const ce = "s1ajzz03";
function it() {
    const t = y()
      , s = o.useNavigate()
      , n = a=>{
        s(`/auth${a}`)
    }
      , c = a=>{
        s(`#/login${a}`)
    }
    ;
    return t.isAuth ? n : c
}
function lt() {
    const {t} = o.useTranslation()
      , s = it()
      , n = o.usePop()
      , c = v()
      , a = y()
      , r = Xe()
      , i = ct(!0)
      , l = tt()
      , u = st()
      , {input: h} = Ye({
        mobile: !0
    })
      , [g,p] = d.useState(!1);
    async function x(f) {
        var w;
        if (f && f.preventDefault(),
        !g) {
            if (p(!0),
            !l.checked)
                return o.notify(new Error(t("Please consent to our user agreement"))),
                p(!1),
                l.showError(),
                !1;
            if (!a.password || a.password.length < 6)
                return o.notify(new Error(t("Password length should not be less than 6 characters"))),
                p(!1),
                !1;
            try {
                const _ = window.localStorage.getItem("before-user-login-type") || "";
                o.app.emit("track", "sign_click", {
                    sign_type: "whatsapp",
                    sign_input: a.email
                }),
                o.app.emit("track", "third_register_click", {
                    account_type: "whatsapp"
                });
                const m = ((w = a.areaCode) == null ? void 0 : w.areaCode) || ""
                  , P = await i(m, a.email, r.invitcode)
                  , R = P == null ? void 0 : P.code;
                if (!R)
                    return p(!1),
                    !1;
                await k.handleRegistPhone({
                    phone: `(+${m})${a.email}`,
                    captcha: R,
                    password: a.password,
                    invitationCode: r.invitcode,
                    acceptPromotion: u.checked,
                    userGroup: _
                }, !0),
                a.onEnd(),
                p(!1)
            } catch (_) {
                p(!1),
                _.code === 5801 ? await n.confirm(t("Looks like you have already registered. Please sign in.")) && (a.onChange({
                    autoLogin: !0
                }),
                s("/signin"),
                c.pop()) : _ && o.notify(_)
            }
        }
    }
    return e.jsx($, {
        title: t("WhatsApp Sign Up"),
        children: e.jsxs("form", {
            onSubmit: x,
            autoComplete: "off",
            children: [e.jsx("p", {
                children: t("Please enter your WhatsApp phone number")
            }), h, e.jsx(o.InputPassword, {
                tabIndex: 2,
                value: a.password,
                onChange: f=>a.onChange({
                    password: f
                }),
                placeholder: t("Login Password"),
                required: !0
            }), e.jsx(ot, {
                str: a.password
            }), r.node, l.node, u.node, e.jsx("div", {
                className: "buttons",
                children: e.jsx(o.Button, {
                    type: "conic",
                    size: "big",
                    loading: g,
                    children: t("Sign up")
                })
            })]
        })
    })
}
function ut() {
    const t = v();
    return d.useCallback(()=>t.push(e.jsx(lt, {})), [t])
}
const re = b.memo(function() {
    const {onEnd: s, invitationCode: n} = y()
      , c = ut();
    return d.useEffect(()=>{
        k.getUrlParam("type") === "whatsapp" && c()
    }
    , []),
    e.jsx(de, {
        onEnd: s,
        invitationCode: n,
        inDialog: !0,
        children: e.jsx("button", {
            id: "wa_login",
            type: "button",
            title: "whatsapp",
            onClick: ()=>c(),
            children: e.jsx(dt, {})
        })
    })
})
  , dt = b.memo(function() {
    return e.jsx("svg", {
        width: "12",
        height: "12",
        viewBox: "0 0 15 15",
        xmlns: "http://www.w3.org/2000/svg",
        className: "icon",
        children: e.jsx("path", {
            d: "M7.2 0a7 7 0 0 0-5.67 11.1l-.87 2.6 2.7-.86A7 7 0 1 0 7.2 0Zm4.08 9.88c-.17.48-.84.88-1.38 1-.36.07-.84.13-2.45-.53-2.06-.86-3.38-2.95-3.49-3.08-.1-.14-.83-1.1-.83-2.11 0-1 .51-1.5.72-1.7.17-.18.45-.26.71-.26h.24c.2.02.3.03.44.36l.63 1.51c.05.1.1.24.03.38-.06.14-.12.2-.22.32s-.2.21-.3.34c-.1.1-.21.23-.1.43.13.2.54.88 1.14 1.41.79.7 1.42.92 1.65 1.02.17.07.37.05.49-.08.16-.17.35-.45.55-.73.14-.2.31-.22.5-.15s1.19.56 1.4.66c.2.1.34.16.38.24.05.09.05.5-.12.97Z"
        })
    })
});
const Z = "inr"
  , mt = "verify"
  , ht = b.memo(function({children: s}) {
    const {t: n} = o.useTranslation()
      , c = y()
      , a = o.useIsMobile()
      , {lang: r} = o.usePageContext()
      , i = ne()
      , [l,u] = o.useSetState({
        loading: !0,
        initAreaCode: "",
        pathName: "",
        search: "",
        bc91231IsIframe: !1
    });
    d.useEffect(()=>{
        const P = i.get("areacode") || ""
          , R = window.location.pathname
          , H = window.location.search;
        u({
            loading: !1,
            initAreaCode: P,
            pathName: R,
            search: H,
            bc91231IsIframe: H.includes("type=iframe")
        });
        const O = M.includes(o.env.host);
        O && c.onChange({
            isBr: O
        })
    }
    , []);
    const h = M.includes(o.env.host) || Q.includes(o.env.host)
      , g = l.search.includes(Z)
      , {imgAssets: p, hideText: x, isRuImg: f, spHost: w} = ft(g ? Z : r, o.env.host)
      , _ = !h && !w && l.initAreaCode === qe
      , m = D.includes(o.env.host);
    return e.jsxs("div", {
        className: N(bt, f && "ru-wrap"),
        children: [!l.bc91231IsIframe && (l.loading ? e.jsx("div", {
            className: "login-left"
        }) : !a && _ ? e.jsx(gt, {}) : e.jsx(pt, {
            imgAssets: p,
            hideText: x
        })), e.jsxs("div", {
            className: "login-right",
            children: [e.jsx(d.Suspense, {
                fallback: null,
                children: s
            }), !l.pathName.includes(mt) && l.pathName && !m && e.jsxs("div", {
                className: "other-sign-wrap",
                children: [e.jsxs("div", {
                    className: "line-text",
                    children: [e.jsx("div", {
                        className: "l"
                    }), e.jsx("div", {
                        className: "t",
                        children: n("Log in directly with")
                    }), e.jsx("div", {
                        className: "l"
                    })]
                }), e.jsx(re, {})]
            }), e.jsx(Y, {})]
        }), a && _ && e.jsx(B, {})]
    })
})
  , pt = b.memo(function({imgAssets: s, hideText: n}) {
    const {t: c} = o.useTranslation()
      , a = o.useIsMobile()
      , i = o.useIsDarken() ? a ? s.bg_m : s.bg : a ? s.bg_m_w : s.bg_w;
    return e.jsxs("div", {
        className: "login-left",
        children: [e.jsx("img", {
            alt: "",
            src: i,
            className: "common-left-img"
        }), !n && e.jsxs("div", {
            className: "left-text",
            children: [e.jsxs("p", {
                className: "t",
                children: [c("Welcome to"), e.jsx("span", {
                    children: se
                })]
            }), e.jsx("p", {
                className: "st",
                children: c("Start your game journey now!")
            })]
        })]
    })
})
  , gt = b.memo(function() {
    const s = o.useIsDarken();
    return e.jsxs("div", {
        className: "login-left",
        children: [e.jsx("img", {
            alt: "",
            src: s ? j.pure_bg : j.pure_bg_w,
            className: "common-left-img"
        }), e.jsx("img", {
            alt: "",
            src: j.pure,
            className: "pure"
        }), e.jsx(B, {})]
    })
});
function ft(t, s) {
    let n = !1;
    const c = t === "pt"
      , a = t === "ja"
      , r = t === "inr";
    let i = j.common
      , l = !1;
    c && (i = j.br),
    a && (i = j.ja,
    l = !0),
    r && (i = j.inr,
    l = !0);
    const u = c || a || r;
    return M.indexOf(s) >= 0 && (i = j.br,
    l = !1),
    Q.indexOf(s) >= 0 && (i = j.ru,
    l = !0,
    n = !0),
    D.indexOf(s) >= 0 && (i = j.kenya,
    l = !1),
    {
        imgAssets: i,
        hideText: l,
        isRuImg: n,
        spHost: u
    }
}
const bt = "ithbrou";
const xt = b.memo(function({children: s}) {
    const {t: n} = o.useTranslation()
      , c = y()
      , a = ne()
      , [r,i] = d.useState("");
    d.useEffect(()=>{
        const u = a.get("areacode");
        u && i(u);
        const h = window.location.host
          , g = M.includes(h);
        g && c.onChange({
            isBr: g
        })
    }
    , []);
    const l = r === "IN";
    return e.jsxs("div", {
        className: N(wt, l && "have-bot"),
        children: [e.jsxs("div", {
            className: "big-login-left",
            children: [e.jsx("img", {
                alt: "login-png",
                src: j.big_left
            }), e.jsxs("div", {
                className: "left-text-wrap",
                children: [e.jsxs("p", {
                    className: "t",
                    children: [n("Welcome to"), e.jsx("span", {
                        children: se
                    })]
                }), e.jsx("p", {
                    className: "st",
                    children: n("Start your game journey now!")
                })]
            })]
        }), e.jsxs("div", {
            className: "big-login-right",
            style: {
                position: "relative"
            },
            children: [e.jsx(d.Suspense, {
                fallback: null,
                children: s
            }), e.jsxs("div", {
                className: "other-sign-wrap",
                children: [e.jsxs("div", {
                    className: "line-text",
                    children: [e.jsx("div", {
                        className: "l"
                    }), e.jsx("div", {
                        className: "t",
                        children: n("Log in directly with")
                    }), e.jsx("div", {
                        className: "l"
                    })]
                }), e.jsx(re, {})]
            }), e.jsx(Y, {})]
        }), e.jsx("a", {
            href: l ? "#" : "/",
            rel: "noopener noreferrer",
            children: e.jsx("img", {
                alt: "logo",
                src: o.app.assets("/logo/logo.png"),
                className: "big-logo"
            })
        }), l && e.jsx(B, {})]
    })
})
  , wt = "b4aal7";
const _t = b.memo(function({isAuth: s, children: n}) {
    const [c,a] = d.useState(800)
      , r = o.useResize(i=>{
        a(i.width)
    }
    );
    return e.jsx(Ze, {
        isAuth: s,
        children: e.jsx("div", {
            className: vt,
            ref: r,
            children: e.jsx(jt, {
                width: c,
                children: n
            })
        })
    })
})
  , jt = b.memo(function({width: s, children: n}) {
    const [c,a] = d.useState(!1);
    return d.useEffect(()=>{
        s >= 801 ? c || a(!0) : c && a(!1)
    }
    , [s]),
    c ? e.jsx(xt, {
        children: n
    }) : e.jsx(ht, {
        children: n
    })
})
  , vt = "s1bscfa1"
  , Et = _t;
export {ot as C, Et as M, $ as S, Rt as a, Ye as b, y as c, k as d, Xe as e, tt as f, st as g, Lt as h, ct as i, v as j, D as k, me as l, it as u};
