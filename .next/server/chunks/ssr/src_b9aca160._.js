module.exports = [
"[project]/src/components/ui/customAlert.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/ui/customAlert.tsx
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useAlert",
    ()=>useAlert
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
// Componente do Alert
const CustomAlert = ({ message, type = 'info', duration = 3000, onClose })=>{
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsVisible(false);
        setTimeout(()=>onClose(), 300);
    }, [
        onClose
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsVisible(true);
        if (duration > 0) {
            const timer = setTimeout(()=>{
                handleClose();
            }, duration);
            return ()=>clearTimeout(timer);
        }
    }, [
        duration,
        handleClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed top-4 right-4 min-w-[300px] p-4 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out z-50 flex items-center ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} ${type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600 border-l-4 border-green-700 text-white' : type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600 border-l-4 border-red-700 text-white' : type === 'warning' ? 'bg-gradient-to-r from-orange-500 to-orange-600 border-l-4 border-orange-700 text-white' : 'bg-gradient-to-r from-blue-500 to-blue-600 border-l-4 border-blue-700 text-white'}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between items-center w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex-1 mr-3 text-sm font-medium leading-relaxed",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/customAlert.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleClose,
                    className: "w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-200 text-white text-lg font-bold",
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/customAlert.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/customAlert.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/customAlert.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useAlert = ()=>{
    const [alerts, setAlerts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const showAlert = (message, type = 'info')=>{
        const id = Date.now();
        setAlerts((prev)=>[
                ...prev,
                {
                    id,
                    message,
                    type
                }
            ]);
    };
    const removeAlert = (id)=>{
        setAlerts((prev)=>prev.filter((alert)=>alert.id !== id));
    };
    const AlertContainer = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: alerts.map((alert)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomAlert, {
                    message: alert.message,
                    type: alert.type,
                    onClose: ()=>removeAlert(alert.id)
                }, alert.id, false, {
                    fileName: "[project]/src/components/ui/customAlert.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)))
        }, void 0, false);
    return {
        showAlert,
        AlertContainer
    };
};
const __TURBOPACK__default__export__ = CustomAlert;
}),
"[project]/src/constants/information.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INFORMATION_CONFIG",
    ()=>INFORMATION_CONFIG
]);
const INFORMATION_CONFIG = {
    display: {
        // Número formatado para exibição
        formattedNumber: "+244 953 145 856",
        linkformattedNumberCall: "tel:+244953145856",
        linkEmail: "osvaldomj.contact@gmail.com",
        linkInformation: "Seg - Sex: 8h00 - 18h00",
        linkLocalization: "Zango-4 • Benfica"
    }
};
}),
"[project]/src/app/(containers)/contato/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Contacto
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$customAlert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/customAlert.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$whatsapp$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/whatsapp.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$information$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/information.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
// Mapeamento dos assuntos para valores em inglês
const subjectMapping = {
    'informacao': 'Informações Gerais',
    'visita': 'Agendar Visita',
    'suporte': 'Suporte Técnico',
    'outro': 'Outro'
};
// Função auxiliar para detectar tipo de erro - SILENCIOSA
const getErrorType = (error)=>{
    if (!error) return 'UNKNOWN_ERROR';
    // Erro de timeout
    if (error.message === 'TIMEOUT_ERROR') {
        return 'TIMEOUT_ERROR';
    }
    // Erro de rede
    if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED' || error.message?.includes('Network Error')) {
        return 'NETWORK_ERROR';
    }
    // Erro de validação (status 400)
    if (error.response?.status === 400) {
        return 'VALIDATION_ERROR';
    }
    // Erro do servidor (status 500+)
    if (error.response?.status && error.response.status >= 500) {
        return 'SERVER_ERROR';
    }
    return 'UNKNOWN_ERROR';
};
// Função para retry automático - SILENCIOSA
const retryApiCall = async (fn, retries = 2)=>{
    try {
        return await fn();
    } catch (error) {
        if (retries > 0 && getErrorType(error) === 'NETWORK_ERROR') {
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            return retryApiCall(fn, retries - 1);
        }
        throw error;
    }
};
// Função para processar erros de validação
const processValidationErrors = (errors)=>{
    const validationErrors = {};
    if (!errors) return validationErrors;
    // Se for array de strings
    if (Array.isArray(errors)) {
        errors.forEach((err)=>{
            if (err.includes('Full name') || err.includes('Nome')) validationErrors.nome = err;
            else if (err.includes('Email') || err.includes('E-mail')) validationErrors.email = err;
            else if (err.includes('Phone') || err.includes('Telefone')) validationErrors.telefone = err;
            else if (err.includes('Subject') || err.includes('Assunto')) validationErrors.assunto = err;
            else if (err.includes('Message') || err.includes('Mensagem')) validationErrors.mensagem = err;
        });
    } else if (typeof errors === 'object') {
        Object.entries(errors).forEach(([field, errorMessages])=>{
            if (Array.isArray(errorMessages) && errorMessages.length > 0) {
                const errorMessage = errorMessages[0];
                if (field.includes('FullName') || field.includes('fullName') || field.includes('nome')) validationErrors.nome = errorMessage;
                else if (field.includes('Email') || field.includes('email')) validationErrors.email = errorMessage;
                else if (field.includes('Phone') || field.includes('phone') || field.includes('telefone')) validationErrors.telefone = errorMessage;
                else if (field.includes('Subject') || field.includes('subject') || field.includes('assunto')) validationErrors.assunto = errorMessage;
                else if (field.includes('Message') || field.includes('message') || field.includes('mensagem')) validationErrors.mensagem = errorMessage;
            }
        });
    }
    return validationErrors;
};
function Contacto() {
    const { showAlert, AlertContainer } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$customAlert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAlert"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: ""
    });
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    // Função para formatar nome (PRIMEIRA maiúscula, RESTO minúscula)
    const formatNamePart = (name)=>{
        if (!name) return "";
        // Remove espaços extras e trim
        const cleaned = name.trim();
        // PRIMEIRA LETRA MAIÚSCULA, RESTO SEMPRE MINÚSCULA
        if (cleaned.length > 0) {
            return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
        }
        return cleaned;
    };
    // Função para juntar nome e sobrenome em FullName
    const getFullName = ()=>{
        const nomeFormatado = formatNamePart(formData.nome);
        const sobrenomeFormatado = formatNamePart(formData.sobrenome);
        if (nomeFormatado && sobrenomeFormatado) {
            return `${nomeFormatado} ${sobrenomeFormatado}`;
        } else if (nomeFormatado) {
            return nomeFormatado;
        } else if (sobrenomeFormatado) {
            return sobrenomeFormatado;
        }
        return "";
    };
    // Função para validar e formatar email (sempre minúsculo)
    const handleEmailChange = (value)=>{
        const cleaned = value.toLowerCase().trim();
        setFormData((prev)=>({
                ...prev,
                email: cleaned
            }));
    };
    // Função para validar telefone (9 dígitos, começando com 9)
    const validateTelefone = (telefone)=>{
        const numbers = telefone.replace(/\D/g, '');
        const telefoneRegex = /^9\d{8}$/;
        return telefoneRegex.test(numbers);
    };
    // Função para formatar telefone enquanto digita
    const formatTelefone = (value)=>{
        const numbers = value.replace(/\D/g, '');
        // Garantir que começa com 9
        let formatted = numbers;
        if (formatted.length > 0 && formatted[0] !== '9') {
            formatted = '9' + formatted.slice(1);
        }
        // Limitar a 9 dígitos
        formatted = formatted.slice(0, 9);
        // Formatar visualmente: 9XX XXX XXX
        if (formatted.length <= 3) {
            return formatted;
        } else if (formatted.length <= 6) {
            return `${formatted.slice(0, 3)} ${formatted.slice(3)}`;
        } else {
            return `${formatted.slice(0, 3)} ${formatted.slice(3, 6)} ${formatted.slice(6)}`;
        }
    };
    // Handler para input do telefone
    const handleTelefoneInput = (value)=>{
        const formatted = formatTelefone(value);
        setFormData((prev)=>({
                ...prev,
                telefone: formatted
            }));
        // Limpar erro do telefone quando usuário começar a digitar
        if (errors.telefone) {
            setErrors((prev)=>({
                    ...prev,
                    telefone: ''
                }));
        }
    };
    // Função para validar nome (mínimo 2 caracteres)
    const validateNamePart = (name)=>{
        return name.length >= 2;
    };
    // Função para validar email
    const validateEmail = (email)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setErrors({});
        // Validações do frontend - NOME
        if (!validateNamePart(formData.nome)) {
            setErrors((prev)=>({
                    ...prev,
                    nome: 'Nome deve ter pelo menos 2 caracteres'
                }));
            showAlert("Por favor, corrija o nome.", "warning");
            setIsLoading(false);
            return;
        }
        // Validações do frontend - SOBRENOME (opcional mas recomendado)
        if (formData.sobrenome && !validateNamePart(formData.sobrenome)) {
            setErrors((prev)=>({
                    ...prev,
                    sobrenome: 'Sobrenome deve ter pelo menos 2 caracteres'
                }));
            showAlert("Por favor, corrija o sobrenome.", "warning");
            setIsLoading(false);
            return;
        }
        if (!validateEmail(formData.email)) {
            setErrors((prev)=>({
                    ...prev,
                    email: 'Email inválido'
                }));
            showAlert("Por favor, insira um email válido.", "warning");
            setIsLoading(false);
            return;
        }
        // Validação do telefone antes de enviar
        const telefoneNumbers = formData.telefone.replace(/\D/g, '');
        if (!validateTelefone(formData.telefone)) {
            setErrors((prev)=>({
                    ...prev,
                    telefone: 'Telefone deve ter 9 dígitos e começar com 9 (ex: 923 456 789)'
                }));
            showAlert("Por favor, corrija o número de telefone.", "warning");
            setIsLoading(false);
            return;
        }
        try {
            // Juntar nome e sobrenome em FullName para a API
            const fullName = getFullName();
            // Mapear dados para o formato da API
            const apiData = {
                fullName: fullName,
                phone: telefoneNumbers,
                email: formData.email.toLowerCase(),
                subject: subjectMapping[formData.assunto] || formData.assunto,
                message: formData.mensagem
            };
            // Função de requisição com timeout
            const makeRequest = async ()=>{
                const controller = new AbortController();
                const timeoutId = setTimeout(()=>controller.abort(), 10000);
                try {
                    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/v1/Support/SendEmail', apiData, {
                        signal: controller.signal
                    });
                    clearTimeout(timeoutId);
                    return response;
                } catch (error) {
                    clearTimeout(timeoutId);
                    if (error.name === 'AbortError') {
                        throw new Error('TIMEOUT_ERROR');
                    }
                    throw error;
                }
            };
            // Executar requisição com retry automático
            const response = await retryApiCall(makeRequest);
            if (response.data?.success) {
                showAlert("Mensagem enviada com sucesso! Entraremos em contacto em breve.", "success");
                setFormData({
                    nome: "",
                    sobrenome: "",
                    email: "",
                    telefone: "",
                    assunto: "",
                    mensagem: ""
                });
            } else {
                showAlert("Erro ao enviar mensagem. Tente novamente.", "error");
            }
        } catch (error) {
            // ⭐⭐ REMOVIDO COMPLETAMENTE O console.error ⭐⭐
            // Nenhum log no console - tratamento totalmente silencioso
            const errorType = getErrorType(error);
            switch(errorType){
                case 'NETWORK_ERROR':
                    showAlert("Erro de conexão. Verifique sua internet e tente novamente.", "error");
                    break;
                case 'TIMEOUT_ERROR':
                    showAlert("Tempo de espera esgotado. O servidor está demorando para responder.", "error");
                    break;
                case 'VALIDATION_ERROR':
                    const apiError = error;
                    if (apiError.response?.data?.errors) {
                        const validationErrors = processValidationErrors(apiError.response.data.errors);
                        setErrors(validationErrors);
                        showAlert("Por favor, corrija os erros no formulário.", "warning");
                    } else {
                        showAlert("Dados inválidos. Verifique as informações do formulário.", "warning");
                    }
                    break;
                case 'SERVER_ERROR':
                    showAlert("Servidor indisponível no momento. Tente novamente em alguns instantes.", "error");
                    break;
                default:
                    if (error.response?.data?.message) {
                        showAlert(error.response.data.message, "error");
                    } else {
                        showAlert("Erro inesperado ao enviar mensagem. Tente novamente mais tarde.", "error");
                    }
            }
        } finally{
            setIsLoading(false);
        }
    };
    const handleChange = (field, value)=>{
        if (field === 'telefone') {
            handleTelefoneInput(value);
        } else if (field === 'email') {
            handleEmailChange(value);
        } else {
            setFormData((prev)=>({
                    ...prev,
                    [field]: value
                }));
        }
        // Limpar erro do campo quando usuário começar a digitar
        if (errors[field]) {
            setErrors((prev)=>({
                    ...prev,
                    [field]: ''
                }));
        }
    };
    // Handler específico para o blur dos nomes (aplica formatação final)
    const handleNameBlur = (field, value)=>{
        const formatted = formatNamePart(value);
        setFormData((prev)=>({
                ...prev,
                [field]: formatted
            }));
    };
    // Handler específico para o blur do email (aplica formatação final)
    const handleEmailBlur = (value)=>{
        const formatted = value.toLowerCase().trim();
        setFormData((prev)=>({
                ...prev,
                email: formatted
            }));
    };
    const contactInfo = [
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaWhatsapp"],
            title: "WhatsApp",
            info: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$whatsapp$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WHATSAPP_CONFIG"].display.formattedNumber,
            link: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$whatsapp$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WHATSAPP_CONFIG"].urls.withMessage,
            color: "text-green-500"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaPhone"],
            title: "Telefone",
            info: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$information$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INFORMATION_CONFIG"].display.formattedNumber,
            link: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$information$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INFORMATION_CONFIG"].display.linkformattedNumberCall,
            color: "text-blue-500"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaEnvelope"],
            title: "Email",
            info: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$information$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INFORMATION_CONFIG"].display.linkEmail,
            link: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$information$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INFORMATION_CONFIG"].display.linkEmail,
            color: "text-orange-500"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaMapMarkerAlt"],
            title: "Localização",
            info: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$information$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INFORMATION_CONFIG"].display.linkLocalization,
            link: "/localizacao",
            color: "text-red-500"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaClock"],
            title: "Horário de Atendimento",
            info: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$information$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INFORMATION_CONFIG"].display.linkInformation,
            link: "#",
            color: "text-purple-500"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertContainer, {}, void 0, false, {
                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                lineNumber: 418,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4",
                                children: [
                                    "Entre em ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-orange-600",
                                        children: "Contacto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 22
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                lineNumber: 424,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                                children: "Estamos aqui para ajudar. Entre em contacto connosco através dos nossos canais de atendimento."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                lineNumber: 427,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                        lineNumber: 423,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold text-gray-800 dark:text-white mb-6",
                                                children: "Informações de Contacto"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                lineNumber: 437,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-6",
                                                children: contactInfo.map((item, index)=>{
                                                    const Icon = item.icon;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: item.link,
                                                        target: item.link.startsWith('http') ? '_blank' : '_self',
                                                        rel: item.link.startsWith('http') ? 'noopener noreferrer' : '',
                                                        className: "flex items-center space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-105 group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `p-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-xl transition-all duration-300 ${item.color}`,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                    className: "w-6 h-6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                    lineNumber: 453,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 452,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "font-semibold text-gray-800 dark:text-white",
                                                                        children: item.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                        lineNumber: 456,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-gray-600 dark:text-gray-300",
                                                                        children: item.info
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                        lineNumber: 457,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 455,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                lineNumber: 441,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                        lineNumber: 436,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-2xl p-8 text-white",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                                                    className: "w-12 h-12 mx-auto mb-4 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                    lineNumber: 468,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold mb-2",
                                                    children: "Contacto de Emergência"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-orange-100 mb-4",
                                                    children: "Disponível 24/7 para situações urgentes"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                    lineNumber: 470,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$whatsapp$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WHATSAPP_CONFIG"].urls.withMessageEmargencia,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "inline-flex items-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                            lineNumber: 477,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Falar no WhatsApp Agora"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                            lineNumber: 478,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                    lineNumber: 471,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                            lineNumber: 467,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                        lineNumber: 466,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                lineNumber: 435,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-gray-800 dark:text-white mb-6",
                                        children: "Envie-nos uma Mensagem"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                        lineNumber: 486,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSubmit,
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                                                                children: "Nome *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 495,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaUser"], {
                                                                            className: "h-4 w-4 text-gray-400"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                            lineNumber: 500,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                        lineNumber: 499,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        required: true,
                                                                        value: formData.nome,
                                                                        onChange: (e)=>handleChange('nome', e.target.value),
                                                                        onBlur: (e)=>handleNameBlur('nome', e.target.value),
                                                                        className: `w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${errors.nome ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-orange-500'}`,
                                                                        placeholder: "Ex: Domingos"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                        lineNumber: 502,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 498,
                                                                columnNumber: 19
                                                            }, this),
                                                            errors.nome ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-red-500 text-sm mt-1 flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaExclamationTriangle"], {
                                                                        className: "w-3 h-3 mr-1"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                        lineNumber: 516,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    errors.nome
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 515,
                                                                columnNumber: 21
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-500 text-sm mt-1",
                                                                children: "Primeiro nome"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 520,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                        lineNumber: 494,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                                                                children: "Sobrenome"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 528,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaUser"], {
                                                                            className: "h-4 w-4 text-gray-400"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                            lineNumber: 533,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                        lineNumber: 532,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        value: formData.sobrenome,
                                                                        onChange: (e)=>handleChange('sobrenome', e.target.value),
                                                                        onBlur: (e)=>handleNameBlur('sobrenome', e.target.value),
                                                                        className: `w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${errors.sobrenome ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-orange-500'}`,
                                                                        placeholder: "Ex: Nascimento"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                        lineNumber: 535,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 531,
                                                                columnNumber: 19
                                                            }, this),
                                                            errors.sobrenome ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-red-500 text-sm mt-1 flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaExclamationTriangle"], {
                                                                        className: "w-3 h-3 mr-1"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                        lineNumber: 548,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    errors.sobrenome
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 547,
                                                                columnNumber: 21
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-500 text-sm mt-1",
                                                                children: "Sobrenome (opcional)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 552,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                        lineNumber: 527,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                lineNumber: 492,
                                                columnNumber: 15
                                            }, this),
                                            formData.nome && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-blue-800 dark:text-blue-300",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Nome completo que será enviado:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                            lineNumber: 563,
                                                            columnNumber: 21
                                                        }, this),
                                                        ' ',
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: getFullName()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                            lineNumber: 564,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                    lineNumber: 562,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                lineNumber: 561,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                                                                children: "Email *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 571,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "email",
                                                                required: true,
                                                                value: formData.email,
                                                                onChange: (e)=>handleChange('email', e.target.value),
                                                                onBlur: (e)=>handleEmailBlur(e.target.value),
                                                                className: `w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-all duration-200 lowercase ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-orange-500'}`,
                                                                placeholder: "seu@email.com"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 574,
                                                                columnNumber: 19
                                                            }, this),
                                                            errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-red-500 text-sm mt-1 flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaExclamationTriangle"], {
                                                                        className: "w-3 h-3 mr-1"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                        lineNumber: 587,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    errors.email
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 586,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                        lineNumber: 570,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                                                                children: "Telefone *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 594,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "tel",
                                                                required: true,
                                                                value: formData.telefone,
                                                                onChange: (e)=>handleChange('telefone', e.target.value),
                                                                className: `w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${errors.telefone ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-orange-500'}`,
                                                                placeholder: "9XX XXX XXX",
                                                                maxLength: 11
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 597,
                                                                columnNumber: 19
                                                            }, this),
                                                            errors.telefone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-red-500 text-sm mt-1 flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaExclamationTriangle"], {
                                                                        className: "w-3 h-3 mr-1"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                        lineNumber: 610,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    errors.telefone
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 609,
                                                                columnNumber: 21
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-500 text-sm mt-1",
                                                                children: "Formato: 9 dígitos começando com 9"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 614,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                        lineNumber: 593,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                lineNumber: 569,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                                                        children: "Assunto *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                        lineNumber: 622,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        required: true,
                                                        value: formData.assunto,
                                                        onChange: (e)=>handleChange('assunto', e.target.value),
                                                        className: `w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none transition-all duration-200 ${errors.assunto ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-orange-500'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "Selecione o assunto"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 633,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "informacao",
                                                                children: "Informações Gerais"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 634,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "visita",
                                                                children: "Agendar Visita"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 635,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "suporte",
                                                                children: "Suporte Técnico"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 636,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "outro",
                                                                children: "Outro"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 637,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                        lineNumber: 625,
                                                        columnNumber: 17
                                                    }, this),
                                                    errors.assunto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-red-500 text-sm mt-1 flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaExclamationTriangle"], {
                                                                className: "w-3 h-3 mr-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 641,
                                                                columnNumber: 21
                                                            }, this),
                                                            errors.assunto
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                        lineNumber: 640,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                lineNumber: 621,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                                                        children: "Mensagem *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                        lineNumber: 648,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        required: true,
                                                        rows: 6,
                                                        value: formData.mensagem,
                                                        onChange: (e)=>handleChange('mensagem', e.target.value),
                                                        className: `w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-all duration-200 resize-none ${errors.mensagem ? 'border-red-500' : 'border-gray-200 dark:border-gray-600 focus:border-orange-500'}`,
                                                        placeholder: "Descreva a sua mensagem..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                        lineNumber: 651,
                                                        columnNumber: 17
                                                    }, this),
                                                    errors.mensagem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-red-500 text-sm mt-1 flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaExclamationTriangle"], {
                                                                className: "w-3 h-3 mr-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                                lineNumber: 663,
                                                                columnNumber: 21
                                                            }, this),
                                                            errors.mensagem
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                        lineNumber: 662,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                lineNumber: 647,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: isLoading,
                                                className: "w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2",
                                                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                            lineNumber: 676,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Enviando..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                            lineNumber: 677,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaPaperPlane"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                            lineNumber: 681,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Enviar Mensagem"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                            lineNumber: 682,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                lineNumber: 669,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                        lineNumber: 490,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                lineNumber: 485,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                        lineNumber: 432,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-16 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold text-center text-gray-800 dark:text-white mb-8",
                                children: "Perguntas Frequentes"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                lineNumber: 692,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                children: [
                                    {
                                        pergunta: "Como me candidatar a um apartamento?",
                                        resposta: "Pode candidatar-se através do nosso site, preenchendo o formulário de candidatura online ou contactando-nos diretamente."
                                    },
                                    {
                                        pergunta: "Quais os documentos necessários?",
                                        resposta: "BI, comprovativo de rendimentos, declaração de IRS e outros documentos que possam ser solicitados conforme o caso."
                                    },
                                    {
                                        pergunta: "Qual o prazo de resposta?",
                                        resposta: "O prazo médio de resposta é de 5 a 10 dias úteis após a submissão completa da candidatura."
                                    },
                                    {
                                        pergunta: "Posso agendar uma visita?",
                                        resposta: `Sim, pode agendar uma visita através do nosso ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$whatsapp$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WHATSAPP_CONFIG"].display.buttonText} ou formulário de contacto.`
                                    }
                                ].map((faq, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-gray-800 dark:text-white mb-2",
                                                children: [
                                                    "Q: ",
                                                    faq.pergunta
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                lineNumber: 715,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 dark:text-gray-300",
                                                children: [
                                                    "R: ",
                                                    faq.resposta
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                                lineNumber: 716,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                        lineNumber: 714,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                                lineNumber: 695,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(containers)/contato/page.tsx",
                        lineNumber: 691,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(containers)/contato/page.tsx",
                lineNumber: 420,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(containers)/contato/page.tsx",
        lineNumber: 417,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_b9aca160._.js.map