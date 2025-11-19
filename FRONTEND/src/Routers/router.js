// FRONTEND/src/Routers/router.js

export const HOME = '/home';
export const LOGIN = '/login';
export const CREAR = '/create';
export const EDITAR = '/edit/:id';
export const VIEW = '/view/:id';
export const CLIENTS = '/clients';
export const DASHBOARD = "/dashboard"; // Ruta pública de dashboard (si aún la usamos)

// Rutas del Dashboard
export const ADMIN = '/admin';
// Nota como ahora son sub-rutas (no empiezan con /, son relativas si usas children en el router, 
// pero para simplificarte la vida ahora, usaremos rutas absolutas claras)
export const RESERVAS_DASHBOARD = '/admin/reservas'; 
export const CLIENTS_DASHBOARD = '/admin/clientes';
export const PAGOS_DASHBOARD = '/admin/pagos';
export const HABITACIONES_DASHBOARD = '/admin/habitaciones';