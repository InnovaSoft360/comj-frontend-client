(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/layouts/footer/styles.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "footerMain": "styles-module__8fiU1q__footerMain",
  "footerWave": "styles-module__8fiU1q__footerWave",
  "logoUnderline": "styles-module__8fiU1q__logoUnderline",
  "shapeFill": "styles-module__8fiU1q__shapeFill",
  "underline": "styles-module__8fiU1q__underline",
});
}),
"[project]/src/components/layouts/footer/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$footer$2f$styles$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/layouts/footer/styles.module.css [app-client] (css module)");
'use client';
;
;
;
;
;
function Footer() {
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const anoAtual = new Date().getFullYear();
    // Variants com tipo correto
    const cardVariants = {
        offscreen: {
            y: 50,
            opacity: 0
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-gradient-to-br from-gray-900 to-gray-800 pt-10 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$footer$2f$styles$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footerWave,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    "data-name": "Layer 1",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 1200 120",
                    preserveAspectRatio: "none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$footer$2f$styles$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shapeFill
                    }, void 0, false, {
                        fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$footer$2f$styles$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footerMain, " py-20 relative"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-5 relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-10 mb-12",
                            initial: "offscreen",
                            whileInView: "onscreen",
                            viewport: {
                                once: true,
                                amount: 0.3
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10 hover:transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden",
                                    variants: cardVariants,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-white uppercase",
                                                    children: "Condomínio Osvaldo MJ"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                                    lineNumber: 58,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$footer$2f$styles$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoUnderline, " mt-2 mb-4")
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-300 text-sm leading-relaxed mb-6",
                                            children: "Residências exclusivas para famílias, oferecendo segurança, conforto e qualidade de vida excepcional em um ambiente moderno e bem localizado."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                            lineNumber: 61,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4",
                                            children: [
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaFacebookF"],
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaInstagram"],
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaTwitter"],
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaLinkedinIn"]
                                            ].map((Icon, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#",
                                                    className: "w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-gradient-to-br from-red-600 to-orange-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 21
                                                    }, this)
                                                }, index, false, {
                                                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10 hover:transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden",
                                    variants: cardVariants,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-white uppercase mb-4",
                                            children: "Navegação rápida"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                            lineNumber: 83,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$footer$2f$styles$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].underline, " mb-6")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                            lineNumber: 84,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-3",
                                            children: [
                                                {
                                                    href: '/',
                                                    label: 'Início'
                                                },
                                                {
                                                    href: '/etapas',
                                                    label: 'Etapas'
                                                },
                                                {
                                                    href: '/galerias',
                                                    label: 'Galerias'
                                                },
                                                {
                                                    href: '/politica-privacidade',
                                                    label: 'Política de Privacidade'
                                                }
                                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: item.href,
                                                        className: "flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 text-sm group",
                                                        onClick: scrollToTop,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-orange-500 mr-3 transition-transform duration-300 group-hover:translate-x-1",
                                                                children: "→"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                                                lineNumber: 98,
                                                                columnNumber: 23
                                                            }, this),
                                                            item.label
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 21
                                                    }, this)
                                                }, item.href, false, {
                                                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10 hover:transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden",
                                    variants: cardVariants,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-white uppercase mb-4",
                                            children: "Contato"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                            lineNumber: 111,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$footer$2f$styles$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].underline, " mb-6")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                {
                                                    icon: '📍',
                                                    text: 'Bairro Zango-4, Icolo e Bengo'
                                                },
                                                {
                                                    icon: '📞',
                                                    text: '+244 900 000 000'
                                                },
                                                {
                                                    icon: '✉️',
                                                    text: 'condominio.osvaldo.mj@gmail.com'
                                                }
                                            ].map((contact, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-orange-500 mr-3 text-lg",
                                                            children: contact.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-300 text-sm",
                                                            children: contact.text
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                                            lineNumber: 121,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-sm text-center md:text-left",
                                    children: [
                                        "© ",
                                        anoAtual,
                                        " Condomínio Osvaldo MJ. Todos os direitos reservados."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://innovasoft360.com",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "text-gray-400 hover:text-white text-sm transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-orange-500 hover:after:w-full after:transition-all after:duration-300",
                                        children: "Develop by: innovaSoft360"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                className: "fixed bottom-8 right-8 bg-gradient-to-br from-red-600 to-orange-500 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-50 w-12 h-12 flex items-center justify-center",
                whileHover: {
                    scale: 1.2,
                    rotate: 360
                },
                whileTap: {
                    scale: 0.95
                },
                transition: {
                    type: "spring",
                    stiffness: 300
                },
                onClick: scrollToTop,
                "aria-label": "Voltar ao topo",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaArrowUp"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                    lineNumber: 156,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layouts/footer/Footer.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layouts/footer/Footer.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layouts/header/styles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "headerStyles",
    ()=>headerStyles
]);
const headerStyles = {
    // Cores
    colors: {
        primary: "from-orange-500 to-red-600",
        primaryHover: "from-orange-600 to-red-700",
        white: "text-white",
        dark: "text-gray-800",
        gray: "text-gray-600"
    },
    // Layout
    layout: {
        header: "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50",
        container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        nav: "flex items-center justify-between h-20"
    },
    // Logo
    logo: {
        container: "flex items-center",
        image: "w-16 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
    },
    // Menu
    menu: {
        desktop: "hidden lg:flex items-center space-x-8",
        mobile: "fixed inset-y-0 left-0 w-80 bg-white shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out z-40",
        mobileOpen: "translate-x-0",
        mobileClosed: "-translate-x-full",
        item: "relative group",
        link: "text-gray-800 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center space-x-1",
        linkUnderline: "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-red-600 after:transition-all after:duration-300 hover:after:w-full"
    },
    // Dropdown
    dropdown: {
        trigger: "flex items-center space-x-1 cursor-pointer",
        title: "text-gray-800 hover:text-orange-500 font-medium transition-colors duration-200",
        arrow: "w-4 h-4 transition-transform duration-200",
        arrowOpen: "rotate-180",
        menu: "absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 opacity-0 invisible scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:scale-100 z-50",
        menuMobile: "relative mt-2 ml-4 w-full bg-gray-50 rounded-lg py-2",
        menuItem: "block px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-150 border-l-4 border-transparent hover:border-orange-500"
    },
    // Botões
    buttons: {
        base: "px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl",
        primary: "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 hover:translate-y-[-2px]",
        logout: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 hover:translate-y-[-2px]"
    },
    // Mobile Toggle
    toggle: {
        container: "lg:hidden flex flex-col justify-center w-8 h-6 cursor-pointer z-50",
        bar: "w-full h-0.5 bg-orange-500 rounded transition-all duration-300 origin-center",
        barOpen: [
            "rotate-45 translate-y-2",
            "opacity-0",
            "-rotate-45 -translate-y-2"
        ]
    },
    // Loading
    loading: "text-gray-500 italic",
    // Animações
    animations: {
        slideIn: "animate-fade-in-up"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const getBaseURL = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
     // SSR
    const isHttps = window.location.protocol === 'https:';
    const port = isHttps ? 7209 : 5211;
    const host = window.location.hostname; // Pega localhost ou IP automaticamente
    return "".concat(isHttps ? 'https' : 'http', "://").concat(host, ":").concat(port);
};
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_BASE_URL || getBaseURL(),
    withCredentials: true
});
const __TURBOPACK__default__export__ = api;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layouts/header/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/hi/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layouts/header/styles.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)"); // Ajuste o caminho conforme sua estrutura
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function Header() {
    _s();
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCheckingAuth, setIsCheckingAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeDropdown, setActiveDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Efeitos
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            checkAuthentication();
            const handleResize = {
                "Header.useEffect.handleResize": ()=>{
                    const mobile = window.innerWidth <= 1024;
                    setIsMobile(mobile);
                    if (!mobile) {
                        setMenuOpen(false);
                        setActiveDropdown(null);
                    }
                }
            }["Header.useEffect.handleResize"];
            handleResize();
            window.addEventListener('resize', handleResize);
            return ({
                "Header.useEffect": ()=>window.removeEventListener('resize', handleResize)
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            function handleClickOutside(event) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setActiveDropdown(null);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "Header.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    // Handlers
    const checkAuthentication = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/v1/Auth/CheckAuth");
            setIsAuthenticated(response.data.authenticated);
        } catch (error) {
            console.error("Erro ao verificar autenticação:", error);
            setIsAuthenticated(false);
        } finally{
            setIsCheckingAuth(false);
        }
    };
    const toggleMenu = ()=>{
        setMenuOpen(!menuOpen);
        if (!menuOpen) setActiveDropdown(null);
    };
    const closeMenu = ()=>{
        setMenuOpen(false);
        setActiveDropdown(null);
    };
    const toggleDropdown = (dropdownName)=>{
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };
    const handleLogout = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/v1/Auth/Logout");
            setIsAuthenticated(false);
            closeMenu();
            router.push("/");
        // showAlert("Logout realizado com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        // showAlert("Erro ao fazer logout.", "error");
        }
    };
    // Dados dos menus
    const menuItems = [
        {
            href: "/",
            label: "Início"
        },
        {
            href: "/etapas",
            label: "Etapas"
        }
    ];
    const galleryItems = [
        {
            href: "/galeria/imagem",
            label: "Imagens"
        },
        {
            href: "/galeria/video",
            label: "Videos"
        }
    ];
    const candidaturaItems = [
        {
            href: "/candidaturas/formulario",
            label: "Formulário"
        },
        {
            href: "/candidatura/estado",
            label: "Estado"
        }
    ];
    const profileItems = [
        {
            href: "/perfil/dados",
            label: "Meus Dados"
        },
        {
            href: "/perfil/editar",
            label: "Editar Perfil"
        },
        {
            href: "/perfil/senha",
            label: "Alterar Senha"
        }
    ];
    if (isCheckingAuth) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].layout.header,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].layout.container,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].layout.nav,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].logo.container,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ml-3 text-xl font-bold text-gray-800",
                                    children: "Condomínio Osvaldo MJ"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                    lineNumber: 120,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].loading,
                            children: "Carregando..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                    lineNumber: 116,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layouts/header/Header.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layouts/header/Header.tsx",
            lineNumber: 114,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].layout.header,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].layout.container,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].layout.nav,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].logo.container,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ml-3 text-xl font-bold text-gray-800",
                                    children: "Condomínio Osvaldo MJ"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].menu.desktop,
                            children: [
                                menuItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].menu.item,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].menu.link, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].menu.linkUnderline),
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this)
                                    }, item.href, false, {
                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                        lineNumber: 146,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].menu.item, " group"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.trigger,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.title,
                                                children: [
                                                    "Galeria ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HiChevronDown"], {
                                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.arrow, " group-hover:").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.arrowOpen)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                lineNumber: 159,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                                            lineNumber: 158,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.menu,
                                            children: galleryItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: item.href,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.menuItem,
                                                        children: item.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 21
                                                    }, this)
                                                }, item.href, false, {
                                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                    lineNumber: 157,
                                    columnNumber: 13
                                }, this),
                                isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].menu.item, " group"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.trigger,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.title,
                                                children: [
                                                    "Candidatura ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HiChevronDown"], {
                                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.arrow, " group-hover:").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.arrowOpen)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                lineNumber: 178,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                                            lineNumber: 177,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.menu,
                                            children: candidaturaItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: item.href,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.menuItem,
                                                        children: item.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                        lineNumber: 185,
                                                        columnNumber: 23
                                                    }, this)
                                                }, item.href, false, {
                                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                                            lineNumber: 182,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this),
                                isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].menu.item, " group"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.trigger,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.title,
                                                children: [
                                                    "Perfil ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HiChevronDown"], {
                                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.arrow, " group-hover:").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.arrowOpen)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 28
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                lineNumber: 198,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                                            lineNumber: 197,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.menu,
                                            children: profileItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: item.href,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].dropdown.menuItem,
                                                        children: item.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 23
                                                    }, this)
                                                }, item.href, false, {
                                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                                            lineNumber: 202,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLogout,
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].buttons.base, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].buttons.logout),
                                        children: "Sair"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                        lineNumber: 217,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].buttons.base, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].buttons.primary),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            children: "Entrar"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                                            lineNumber: 225,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                        lineNumber: 224,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].toggle.container,
                            onClick: toggleMenu,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].toggle.bar, " ").concat(menuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].toggle.barOpen[0] : '')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].toggle.bar, " my-1.5 ").concat(menuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].toggle.barOpen[1] : '')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].toggle.bar, " ").concat(menuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].toggle.barOpen[2] : '')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layouts/header/Header.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].menu.mobile, " ").concat(menuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].menu.mobileOpen : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].menu.mobileClosed),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-20 pb-6 px-6 h-full overflow-y-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-4",
                        ref: dropdownRef,
                        children: [
                            menuItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: "block py-3 text-lg text-gray-800 hover:text-orange-500 font-medium border-b border-gray-200",
                                        onClick: closeMenu,
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                        lineNumber: 249,
                                        columnNumber: 17
                                    }, this)
                                }, item.href, false, {
                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                    lineNumber: 248,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between py-3 text-lg text-gray-800 font-medium border-b border-gray-200 cursor-pointer",
                                        onClick: ()=>toggleDropdown('galeria'),
                                        children: [
                                            "Galeria",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HiChevronDown"], {
                                                className: "w-5 h-5 transition-transform ".concat(activeDropdown === 'galeria' ? 'rotate-180' : '')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                lineNumber: 266,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this),
                                    activeDropdown === 'galeria' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "ml-4 mt-2 space-y-2",
                                        children: galleryItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: item.href,
                                                    className: "block py-2 text-gray-600 hover:text-orange-500",
                                                    onClick: closeMenu,
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 23
                                                }, this)
                                            }, item.href, false, {
                                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                lineNumber: 271,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                        lineNumber: 269,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                lineNumber: 260,
                                columnNumber: 13
                            }, this),
                            isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between py-3 text-lg text-gray-800 font-medium border-b border-gray-200 cursor-pointer",
                                                onClick: ()=>toggleDropdown('candidatura'),
                                                children: [
                                                    "Candidatura",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HiChevronDown"], {
                                                        className: "w-5 h-5 transition-transform ".concat(activeDropdown === 'candidatura' ? 'rotate-180' : '')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                lineNumber: 288,
                                                columnNumber: 19
                                            }, this),
                                            activeDropdown === 'candidatura' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "ml-4 mt-2 space-y-2",
                                                children: candidaturaItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: item.href,
                                                            className: "block py-2 text-gray-600 hover:text-orange-500",
                                                            onClick: closeMenu,
                                                            children: item.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                            lineNumber: 299,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, item.href, false, {
                                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                lineNumber: 296,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                        lineNumber: 287,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between py-3 text-lg text-gray-800 font-medium border-b border-gray-200 cursor-pointer",
                                                onClick: ()=>toggleDropdown('perfil'),
                                                children: [
                                                    "Perfil",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HiChevronDown"], {
                                                        className: "w-5 h-5 transition-transform ".concat(activeDropdown === 'perfil' ? 'rotate-180' : '')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                lineNumber: 313,
                                                columnNumber: 19
                                            }, this),
                                            activeDropdown === 'perfil' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "ml-4 mt-2 space-y-2",
                                                children: profileItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: item.href,
                                                            className: "block py-2 text-gray-600 hover:text-orange-500",
                                                            onClick: closeMenu,
                                                            children: item.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, item.href, false, {
                                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                                lineNumber: 321,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                        lineNumber: 312,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "pt-6",
                                children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleLogout,
                                    className: "w-full ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].buttons.base, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].buttons.logout),
                                    children: "Sair"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                    lineNumber: 342,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-full ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].buttons.base, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layouts$2f$header$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerStyles"].buttons.primary),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        onClick: closeMenu,
                                        children: "Entrar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                                        lineNumber: 350,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                                    lineNumber: 349,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layouts/header/Header.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layouts/header/Header.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layouts/header/Header.tsx",
                    lineNumber: 245,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layouts/header/Header.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layouts/header/Header.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_s(Header, "fbNPYhSzjRS88NL0rui7m1CCXR0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_bc700085._.js.map