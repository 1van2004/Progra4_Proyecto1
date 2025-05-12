import RootLayout from "./Components/RootLayout";
import HomePage from "./Pages/HomePage";
import TareasPage from "./Pages/TareasPage"
import ProveedoresPage from "./Pages/ProveedoresPage";
import { createBrowserHistory, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import InventoryPage from "./Pages/InventoryPage";
const rootRoute = createRootRoute({
    component: RootLayout,
})

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

  rootRoute.addChildren([
    homeRoute,
    tareaRoute,
    inventarioRoute,
    proveedoresRoute, 
]);

const router = createRouter({
       routeTree: rootRoute,
        history: createBrowserHistory(),
        defaultErrorComponent: () => <div>Something went wrong</div>,
      });
    
 export default router; 
