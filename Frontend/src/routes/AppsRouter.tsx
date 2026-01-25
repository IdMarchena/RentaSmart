import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Publications } from "../pages/Publications";
import { Publication } from "../pages/Publication";
import { Servicio } from "../pages/Servicio";
import { HomeDash } from "../admin/pages/HomeDash";
import { PublicationDash } from "../admin/pages/PublicationDash";
import { ContratoDash } from "../admin/pages/ContratoDash";
import { MensajesDash } from "../admin/pages/MensajesDash";
import { ServiciosDash } from "../admin/pages/ServiciosDash";
import { UsuarioDash } from "../admin/pages/UsuarioDash";
import { ServiciosAdminDash } from "../admin/pages/ServiciosAdminDash.tsx";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { PublicacionesRoute, ContratosRoute, ServiciosRoute, MensajesRoute, ProfesionalRoute } from "../components/RolProtectedRoute";

export const AppsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publications" element={<Publications />} />
      <Route path="/publication/:id" element={<Publication />} />
      <Route path="/publications/:id" element={<Publication />} />
      <Route path="/servicio/:id" element={<Servicio />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <HomeDash />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/publications"
        element={
          <ProtectedRoute>
            <PublicacionesRoute>
              <PublicationDash />
            </PublicacionesRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/contracts"
        element={
          <ProtectedRoute>
            <ContratosRoute>
              <ContratoDash />
            </ContratosRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute>
            <MensajesRoute>
              <MensajesDash />
            </MensajesRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/services"
        element={
          <ProtectedRoute>
            <ServiciosRoute>
              <ServiciosDash />
            </ServiciosRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/user"
        element={
          <ProtectedRoute>
            <UsuarioDash />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/servicesAdmin"
        element={
          <ProtectedRoute>
            <ServiciosAdminDash />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
