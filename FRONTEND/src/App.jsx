import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Clients from "./Pages/ClientsPage";
import LoginPage from "./Pages/LoginPage";
import ViewPage from "./Pages/ViewPage";
import EditPage from "./Pages/EditPage";
import CreatePage from "./Pages/CreatePage";
import DashboardPage from "./Pages/DashboardPage";
import ReservasDashboardPage from "./Pages/ReservasDashboardPage";
import ClientsDashboardPage from "./Pages/ClientsDashboardPage";
import PagosDashboardPage from "./Pages/PagosDashboardPage";
import HabitacionesDashboardPage from "./Pages/HabitacionesDashboardPage";
import AdminPage from "./Pages/AdminPage";
import { HOME, ADMIN, CLIENTS, LOGIN, VIEW, EDITAR, CREAR, DASHBOARD, RESERVAS_DASHBOARD, CLIENTS_DASHBOARD, PAGOS_DASHBOARD, HABITACIONES_DASHBOARD } from "./Routers/Router";
import Chatbot from './Components/Chatbot';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app-layout">
        <main className="contenedor-principal">
          <Routes>
            <Route path={HOME} element={<Home />} />
            <Route path={CLIENTS} element={<Clients />} />
            <Route path={LOGIN} element={<LoginPage />} />
            <Route path={VIEW} element={<ViewPage />} />
            <Route path={EDITAR} element={<EditPage />} />
            <Route path={CREAR} element={<CreatePage />} />
            <Route path={DASHBOARD} element={<DashboardPage />} />
            <Route path={RESERVAS_DASHBOARD} element={<ReservasDashboardPage />} />
            <Route path={CLIENTS_DASHBOARD} element={<ClientsDashboardPage />} />
            <Route path={PAGOS_DASHBOARD} element={<PagosDashboardPage />} />
            <Route path={HABITACIONES_DASHBOARD} element={<HabitacionesDashboardPage />} />
            <Route path={ADMIN} element={<AdminPage />} />
          </Routes>
        </main>
      </div>
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;