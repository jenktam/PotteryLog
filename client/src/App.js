// import logo from './logo.svg';
import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home.tsx';
import Profile from './pages/profile/Profile';
import ResetPassword from './pages/resetPassword/ResetPassword';
import ProjectForm from './pages/projectForm/ProjectForm';
import ProjectEdit from './pages/projectEdit/ProjectEdit';
import Project from './pages/project/Project';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import { DarkModeContext } from './context/darkModeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import {
  ErrorComponent,
  useNotificationProvider,
  ThemedLayoutV2,
  ThemedSiderV2,
} from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
// import { Header } from "./components/header";
// import { ColorModeContextProvider } from "./contexts/color-mode";
// import {
//   BlogPostCreate,
//   BlogPostEdit,
//   BlogPostList,
//   BlogPostShow,
// } from "./pages/blog-posts";
// import {
//   CategoryCreate,
//   CategoryEdit,
//   CategoryList,
//   CategoryShow,
// } from "./pages/categories";
// import DashBoardPage from "./pages/dashboardPage";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
        <Navbar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />;
    }

    return children;
  };

  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: (
  //       <ProtectedRoute>
  //         <Layout />
  //       </ProtectedRoute>
  //     ),
  //     children: [
  //       {
  //         path: '/',
  //         element: <Home />,
  //       },
  //       // TODO: add redirect for /projects
  //       {
  //         path: '/projects',
  //         element: <Home />,
  //       },
  //       {
  //         path: '/profile/:id',
  //         element: <Profile />,
  //       },
  //       {
  //         path: '/projects/:id',
  //         element: <Project/>,
  //       },
  //       {
  //         path: '/projects/:id/edit',
  //         element: <ProjectEdit/>,
  //       },
  //       {
  //         path: '/projects/form',
  //         element: <ProjectForm />,
  //       },
  //     ],
  //   },
  //   {
  //     path: '/login',
  //     element: <Login />,
  //   },
  //   {
  //     path: '/register',
  //     element: <Register />,
  //   },
  //   {
  //     path: '/reset-password',
  //     element: <ResetPassword />,
  //   },
  // ]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {/* <RouterProvider router={router} /> */}
        <BrowserRouter>
          <RefineKbarProvider>
            {/* <ColorModeContextProvider> */}
            <DndProvider backend={HTML5Backend}>
              {/* TODO: remove refine */}
              <Refine
                dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: 'dashboard',
                    list: '/',
                  },
                  {
                    name: 'blog_posts',
                    list: '/blog-posts',
                    create: '/blog-posts/create',
                    edit: '/blog-posts/edit/:id',
                    show: '/blog-posts/show/:id',
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: 'categories',
                    list: '/categories',
                    create: '/categories/create',
                    edit: '/categories/edit/:id',
                    show: '/categories/show/:id',
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
              >
                {/* TOOD: move routes to here */}
                <Routes>
                  <Route
                    element={
                      <ThemedLayoutV2
                      // Header={() => <Header sticky />}
                      // Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                      >
                        <ProtectedRoute>
                          <Layout />
                        </ProtectedRoute>
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                    <Route path='/profile/:id' element={<Profile />} />
                    <Route path='/projects'>
                      <Route index element={<Home />} />
                      <Route path=':id' element={<Project />} />
                      <Route path=':id/edit' element={<ProjectEdit />} />
                      <Route path='form' element={<ProjectForm />} />
                    </Route>
                    <Route path='*' element={<ErrorComponent />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </DndProvider>
            {/* </ColorModeContextProvider> */}
          </RefineKbarProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
