/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { useAuthStore } from './store/auth';

// Lazy load pages
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Inventory = React.lazy(() => import('./pages/Inventory'));
const Sales = React.lazy(() => import('./pages/Sales'));
const Suppliers = React.lazy(() => import('./pages/Suppliers'));
const Profile = React.lazy(() => import('./pages/Profile'));
const SignUp = React.lazy(() => import('./pages/Signup'));
const AccountConfirmation = React.lazy(() => import('./pages/AccountConfirmation'));

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Header />}
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/confirm" element={<AccountConfirmation />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <PrivateRoute>
                  <Inventory />
                </PrivateRoute>
              }
            />
            <Route
              path="/sales"
              element={
                <PrivateRoute>
                  <Sales />
                </PrivateRoute>
              }
            />
            <Route
              path="/suppliers"
              element={
                <PrivateRoute>
                  <Suppliers />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
