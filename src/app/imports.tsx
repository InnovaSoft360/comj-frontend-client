export { Navigate, Route, Routes } from "react-router-dom";
export { default as Header } from "../components/layouts/Header";
export { default as Footer} from "../components/layouts/Footer";
export { default as Dashboard} from "../features/private/dasbboard";
export { default as Militar} from "../features/private/militar";
export { default as Home} from "../features/public/home";
export { default as Informacao} from "../features/public/informacao";
export { default as Galeria} from "../features/public/galerias";
export { default as Login} from "../features/public/auth/login";
export { default as RegisterMilitar} from "../features/public/auth/register";
export { default as ForgotPassword} from "../features/public/auth/forgot-password";
export { default as ResetPassword} from "../features/public/auth/reset-password";
export { default as ProtectedRoute} from "./ProtectedRoute";



import "./App.css";
import "./index.css";
