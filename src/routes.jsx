import RootLayout from "./Components/RootLayout";
import HomePage from "./Pages/HomePage";
import TareasPage from "./Pages/TareasPage";
import ReportTablePage from "./Pages/ReportTablePage";
import ReportFormPage from "./Pages/ReportFormPage";
import ProveedoresPage from "./Pages/ProveedoresPage";
import { createBrowserHistory, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import InventoryPage from "./Pages/InventoryPage";
import ListUsersPage from "./Pages/ListUsersPage";
import AddUsersPage from "./Pages/AddUsersPage";
import EditUsersPage from "./Pages/EditUsersPage";
import LoginPage from "./Pages/LoginPage";
// Definición de la ruta raíz
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Rutas de las páginas
const homeRoute = createRoute({ 
  getParentRoute: () => rootRoute,    
  path: "/", 
  component: HomePage, 
}); 

const tareaRoute = createRoute({ 
  getParentRoute: () => rootRoute,    
  path: "/works", 
  component: TareasPage, 
}); 

const proveedoresRoute = createRoute({ 
  getParentRoute: () => rootRoute,    
  path: "/proveedores", 
  component: ProveedoresPage, 
}); 

const inventarioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inventario",
  component: InventoryPage,
});

const reportFormsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reportForms",
  component: ReportFormPage, 
});

const reportTableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reportTable",
  component: ReportTablePage, 
});

const listaUsuariosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lista-usuarios",
  component: ListUsersPage,
});

const agregarUsuarioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agregar-usuario",
  component: AddUsersPage,
});

const editarUsuarioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/editar-usuario/:Id",
  component: EditUsersPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
}); 
// Agregar rutas al root
rootRoute.addChildren([
  homeRoute,
  tareaRoute,
  proveedoresRoute,
  inventarioRoute,
  reportFormsRoute,
  reportTableRoute,
  listaUsuariosRoute,
  agregarUsuarioRoute,
  editarUsuarioRoute,
  loginRoute
]);


// Creación del enrutador
const router = createRouter({
  routeTree: rootRoute,
  history: createBrowserHistory(),
  defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;
