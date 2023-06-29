import React from "react";
import { Routes, Route, Navigate } from "react-router";
import PrivateRoute from "./private-route";
import Login from "pages/login";
import Home from "pages/home";
import NotFound from "pages/notFound";
import StaffRoute from "./staff-route";
export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/404"
        element={
          <PrivateRoute>
            <NotFound />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
