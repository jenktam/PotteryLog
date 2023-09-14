// import logo from './logo.svg';
import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ProjectForm from "./pages/projectForm/ProjectForm";
import ProjectEdit from "./pages/projectEdit/ProjectEdit";
import Project from './pages/project/Project';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import { DarkModeContext } from './context/darkModeContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ flex: 6 }}>
            <Outlet />
          </div>
      </div>
    )
  };

  const ProtectedRoute = ({ children }) => {
    if(!currentUser) {
      return <Navigate to='/login' />;
    };

    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />,
        },
        // TODO: add redirect for /projects
        {
          path: '/projects',
          element: <Home />,
        },
        {
          path: '/profile/:id',
          element: <Profile />,
        },
        {
          path: '/projects/:id',
          element: <Project/>,
        },
        {
          path: '/projects/:id/edit',
          element: <ProjectEdit/>,
        },
        {
          path: '/projects/form',
          element: <ProjectForm />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
  ]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  )
}

export default App;
