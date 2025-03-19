import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './component/Layout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import NotFound from './pages/NotFound';
import Login from './component/Login';
import SignUp from './component/SignUp';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './component/ProductDetails';
import CartContextProvider from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './component/Payment';
import Brands from './pages/Brands';
import SpecificCategories from './component/SpecificCategories';
import SpecificBrand from "./component/SpecificBrand";

const myRouter = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: "cart",
				element: (
					<ProtectedRoute>
						<Cart />
					</ProtectedRoute>
				),
			},
			{
				path: "payment",
				element: (
					<ProtectedRoute>
						<Payment />
					</ProtectedRoute>
				),
			},
			{
				path: "home",
				element: <Home />,
			},
			{ path: "login", element: <Login /> },
			{ path: "signup", element: <SignUp /> },
			{
				path: "categories/:id/:name",
				element: (
					<ProtectedRoute>
						<SpecificCategories />
					</ProtectedRoute>
				),
			},
			{
				path: "brands/:id/:name",
				element: (
					<ProtectedRoute>
						<SpecificBrand/>
					</ProtectedRoute>
				),
			},
			{
				path: "categories",
				element: (
					<ProtectedRoute>
						<Categories />
					</ProtectedRoute>
				),
			},
			{
				path: "brands",
				element: (
					<ProtectedRoute>
						<Brands />
					</ProtectedRoute>
				),
			},
			{
				path: "productDetails/:id/:category",
				element: (
					<ProtectedRoute>
						<ProductDetails />
					</ProtectedRoute>
				),
			},
			{ path: "*", element: <NotFound /> },
		],
	},
]);

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

