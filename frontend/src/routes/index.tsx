import React from "react";
import { Routes, Route, Navigate } from "react-router";
import PrivateRoute from "./private-route";
import Login from "pages/login";
import Home from "pages/home";
import NotFound from "pages/notFound";
import StaffRoute from "./staff-route";
import BoardDetails from "pages/board-details";
export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/kanban"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/kanban/board/:id"
        element={
          <PrivateRoute>
            <BoardDetails />
          </PrivateRoute>
        }
      />
      <Route path="/kanban/login" element={<Login />} />
      <Route
        path="/kanban/404"
        element={
          <PrivateRoute>
            <NotFound />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
