import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Publications } from "../pages/Publications";
import { Publication } from "../pages/Publication";
import { HomeDash } from "../admin/pages/HomeDash";
import { PublicationDash } from "../admin/pages/PublicationDash";
import { ContratoDash } from "../admin/pages/ContratoDash";
import { MensajesDash } from "../admin/pages/MensajesDash";
import { ServiciosDash } from "../admin/pages/ServiciosDash";
import { UsuarioDash } from "../admin/pages/UsuarioDash";
import {ServiciosAdminDash} from "../admin/pages/ServiciosAdminDash.tsx";

export const AppsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publications" element={<Publications />} />
      <Route path="/publication" element={<Publication />} />
      <Route path="/admin" element={<HomeDash />} />
      <Route path="/admin/publications" element={<PublicationDash />} />
      <Route path="/admin/contracts" element={<ContratoDash />} />
      <Route path="/admin/messages" element={<MensajesDash />} />
      <Route path="/admin/services" element={<ServiciosDash />} />
      <Route path="/admin/user" element={<UsuarioDash />} />
        <Route path="/admin/servicesAdmin" element={<ServiciosAdminDash />} />

    </Routes>
  );
};
