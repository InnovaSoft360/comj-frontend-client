export { Navigate, Route, Routes } from "react-router-dom";
export { default as Header } from "../components/layouts/Header";
export { default as Footer} from "../components/layouts/Footer";
export { default as Dashboard} from "../features/private/dasbboard";
export { default as Home} from "../features/public/home";
export { default as Etapas} from "../features/public/etapa";
export { default as Login} from "../features/public/auth/login";
export { default as RegisterMilitar} from "../features/public/auth/register";
export { default as ForgotPassword} from "../features/public/auth/forgot-password";
export { default as ResetPassword} from "../features/public/auth/reset-password";
export { default as ProtectedRoute} from "./ProtectedRoute";
export { default as Candidaturas} from "../features/private/militar/candidaturas/formulario"
export { default as Estado} from "../features/private/militar/candidaturas/estado"
export { default as DadosMilitar} from "../features/private/militar/perfils/dados"
export { default as EditarMilitar} from "../features/private/militar/perfils/editar"
export { default as SenhaMilitar} from "../features/private/militar/perfils/senha"
export { default as GaleriaVideo} from "../features/public/galeria/video"
export { default as GaleriaImagem} from "../features/public/galeria/imagem"



import "./App.css";
import "./index.css";
