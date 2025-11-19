import { Routes, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import Header from "./Components/Header";
// import Footer from "./Components/Footer"; // Si decides usarlo más adelante
import Home from "./Pages/Home";
import Clients from "./Pages/ClientsPage";
import LoginPage from "./Pages/LoginPage";
import ViewPage from "./Pages/ViewPage";
import EditPage from "./Pages/EditPage";
import CreatePage from "./Pages/CreatePage";
import DashboardPage from "./Pages/DashboardPage"; // Opcional si ya no se usa
import ReservasDashboardPage from "./Pages/ReservasDashboardPage";
import ClientsDashboardPage from "./Pages/ClientsDashboardPage";
import PagosDashboardPage from "./Pages/PagosDashboardPage";
import HabitacionesDashboardPage from "./Pages/HabitacionesDashboardPage";
import AdminPage from "./Pages/AdminPage";
import { 
  HOME, ADMIN, CLIENTS, LOGIN, VIEW, EDITAR, CREAR, DASHBOARD, 
  RESERVAS_DASHBOARD, CLIENTS_DASHBOARD, PAGOS_DASHBOARD, HABITACIONES_DASHBOARD 
} from "./Routers/router"; // Asegúrate que coincida con router.js o Router.js
import Chatbot from './Components/Chatbot';

// 1. COMPONENTE LAYOUT PÚBLICO
// Este componente envuelve todas las páginas que NO son admin.
// Mantiene el Header y el diseño original de la web.
const PublicLayout = () => {
  return (
    <>
      <Header />
      <div className="app-layout">
        <main className="contenedor-principal">
          {/* <Outlet /> es donde se pintarán los hijos (Home, Login, etc.) */}
          <Outlet />
        </main>
      </div>
      <Chatbot />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- GRUPO 1: RUTAS PÚBLICAS --- */}
        {/* Usan el PublicLayout (tienen Header y estilos generales) */}
        <Route element={<PublicLayout />}>
          <Route path={HOME} element={<Home />} />
          <Route path={CLIENTS} element={<Clients />} />
          <Route path={LOGIN} element={<LoginPage />} />
          <Route path={VIEW} element={<ViewPage />} />
          <Route path={EDITAR} element={<EditPage />} />
          <Route path={CREAR} element={<CreatePage />} />
          <Route path={DASHBOARD} element={<DashboardPage />} />
        </Route>

        {/* --- GRUPO 2: RUTAS DE ADMINISTRACIÓN (DASHBOARD) --- */}
        {/* NO usan el Header público. Usan AdminPage como su estructura principal (Sidebar + Contenido) */}
        <Route element={<AdminPage />}>
          
          {/* Redirección automática: Si entran a "/admin" o "/admin/", los manda a "/admin/reservas" */}
          <Route path={ADMIN} element={<Navigate to={RESERVAS_DASHBOARD} replace />} />
          <Route index element={<Navigate to={RESERVAS_DASHBOARD} replace />} /> {/* Mantenemos index por si acaso */}

          {/* Estas páginas se cargarán DENTRO del hueco (<Outlet>) de AdminPage */}
          <Route path={RESERVAS_DASHBOARD} element={<ReservasDashboardPage />} />
          <Route path={CLIENTS_DASHBOARD} element={<ClientsDashboardPage />} />
          <Route path={PAGOS_DASHBOARD} element={<PagosDashboardPage />} />
          <Route path={HABITACIONES_DASHBOARD} element={<HabitacionesDashboardPage />} />
          
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;