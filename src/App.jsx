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
        { path: "*", element: <NotFound /> }
      ]
    }
  ]
)

export default function App() {
  return <>
    <AuthContextProvider>
      <RouterProvider router={myRouter} />
    </AuthContextProvider>

  </>
}

