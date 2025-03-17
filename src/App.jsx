import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './component/Layout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import Brands from './pages/Brands';
import NotFound from './pages/NotFound';
import Login from './component/Login';
import SignUp from './component/SignUp';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './component/ProductDetails';
import CartContextProvider from './context/CartContext';
import { Toaster } from 'react-hot-toast';

const myRouter = createBrowserRouter(
  [
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "home", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "productDetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ]
)

const myClient = new QueryClient();

export default function App() {
  return (
			<>
				<QueryClientProvider client={myClient}>
					<AuthContextProvider>
          <CartContextProvider>
						
							<RouterProvider router={myRouter} />
						
					</CartContextProvider>
          </AuthContextProvider>
				</QueryClientProvider>
        <Toaster/>
			</>
		);
}

