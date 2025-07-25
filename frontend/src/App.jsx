import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import CategoryProduct from './pages/CategoryProduct';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/about',
      element: <AboutUs />
    },
    {
      path: '/products',
      element: <CategoryProduct />
    },
    {
      path: '/product/:id',
      element: <ProductDetails />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return (
   
      <RouterProvider router={appRouter}></RouterProvider>
  
  )
}

export default App
