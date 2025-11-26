import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Registro } from "./pages/Registro";
import { Login } from "./pages/Login";
import { Private } from "./pages/Private";

export const router = createBrowserRouter(
  createRoutesFromElements(

    <Route element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Registro />} />

      {/* Ruta privada */}
      <Route path="/private" element={<Private />} />

    </Route>
  )
);
