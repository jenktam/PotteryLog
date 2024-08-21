import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import StickyLayout from './components/stickyLayout/StickyLayout.tsx';
import Home from './pages/home/Home.tsx';
import Profile from './pages/profile/Profile';
import ResetPassword from './pages/resetPassword/ResetPassword';
import AllProjects from './pages/AllProjects/AllProjects.tsx';
import ProjectForm from './pages/projectForm/ProjectForm';
import ProjectEdit from './pages/projectEdit/ProjectEdit';
import Project from './pages/project/Project';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Refine } from '@refinedev/core';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import logo from '../src/assets/vase.svg';
import {
  ErrorComponent,
  useNotificationProvider,
  ThemedLayoutV2,
} from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import routerBindings from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';

function App() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />;
    }

    return children;
  };

  const SideNavTitle = () => {
    return (
      <span className='side-nav-title'>
        <img src={logo} alt='logo' />
        <h5>Pottery Log</h5>
      </span>
    );
  };

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <DndProvider backend={HTML5Backend}>
            <Refine
              dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              resources={[
                {
                  name: 'Kanban Board',
                  list: '/',
                  icon: <DashboardIcon />,
                },
                {
                  name: 'All Projects',
                  list: '/all-projects',
                  create: '/all-projects/create',
                  edit: '/all-projects/edit/:id',
                  show: '/all-projects/show/:id',
                  meta: {
                    canDelete: true,
                  },
                  icon: <CalendarViewMonthIcon />,
                },
                {
                  name: 'All Boards',
                  list: '/boards',
                  create: '/boards/create',
                  edit: '/boards/edit/:id',
                  show: '/boards/show/:id',
                  meta: {
                    canDelete: true,
                  },
                  icon: <BackupTableIcon />,
                },
                {
                  name: 'Settings',
                  list: '/Settings',
                  create: '/Settings/create',
                  edit: '/Settings/edit/:id',
                  show: '/Settings/show/:id',
                  meta: {
                    canDelete: true,
                  },
                  icon: <SettingsIcon />,
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2 Title={SideNavTitle}>
                      <ProtectedRoute>
                        <StickyLayout />
                      </ProtectedRoute>
                    </ThemedLayoutV2>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/reset-password' element={<ResetPassword />} />
                  <Route path='/profile/:id' element={<Profile />} />
                  <Route path='/all-projects' element={<AllProjects />} />
                  <Route path='/projects'>
                    <Route index element={<Home />} />
                    <Route path=':id' element={<Project />} />
                    <Route path=':id/edit' element={<ProjectEdit />} />
                    <Route path='form' element={<ProjectForm />} />
                  </Route>
                  <Route path='*' element={<ErrorComponent />} />
                </Route>
              </Routes>
            </Refine>
          </DndProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
