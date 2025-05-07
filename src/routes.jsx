import RootLayout from "./Components/RootLayout";
import HomePage from "./Pages/HomePage";
import TareasPage from "./Pages/TareasPage"
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

    
 
        rootRoute.addChildren([ 
            homeRoute, 
            tareaRoute
])
const inventarioRoute = createRoute({
    
    getParentRoute: () => rootRoute,
    path: "/inventario",
    component: InventoryPage,
  });

  rootRoute.addChildren([
    homeRoute,
    tareaRoute,
    inventarioRoute, 
]);

const router = createRouter({
       routeTree: rootRoute,
        history: createBrowserHistory(),
        defaultErrorComponent: () => <div>Something went wrong</div>,
      });
    
 export default router; 
