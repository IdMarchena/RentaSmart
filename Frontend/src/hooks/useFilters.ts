import axios from "axios";
import { useState } from "react";
import type { Publicacion, Servicio } from "../types/entities";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:6000/api/v1';

export interface PublicationFilters {
    ubicacion?: string;
    tipoInmueble?: string;
    precioMinimo?: number;
    precioMaximo?: number;
}

export interface ServiceFilters {
    nombre?: string;
    precioMinimo?: number;
    precioMaximo?: number;
}

export const useFilters = () => {
    const [filtersPublications, setFiltersPublications] = useState<Publicacion[]>([]);
    const [filtersServices, setFiltersServices] = useState<Servicio[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getFilteredPublications = async (filters: PublicationFilters) => {
        setLoading(true);
        setError(null);

        try {
            let url = `${API_URL}/publicaciones`;

            const { ubicacion, tipoInmueble, precioMinimo, precioMaximo } = filters;
            const hasFilters = ubicacion || tipoInmueble || precioMinimo !== undefined || precioMaximo !== undefined;

            if (!hasFilters) {
                url += '/listar';
            } else if (ubicacion && tipoInmueble && precioMinimo !== undefined && precioMaximo !== undefined) {
                url += `/listarPublicacionesPorUbicacionYTipoInmueble?ubicacion=${ubicacion}&tipoInmueble=${tipoInmueble}&precioMenor=${precioMinimo}&precioMayor=${precioMaximo}`;
            } else if (precioMinimo !== undefined && precioMaximo !== undefined) {
                url += `/listarPublicacionesPorPrecioEntreMenorYMayor?precioMenor=${precioMinimo}&precioMayor=${precioMaximo}`;
            } else if (ubicacion) {
                url += `/listarPublicacionesPorUbicacion?ubicacion=${ubicacion}`;
            } else if (tipoInmueble) {
                url += `/listarPublicacionesPorTipoInmueble?tipoInmueble=${tipoInmueble}`;
            } else {
                url += '/listar';
            }

            const response = await axios.get<Publicacion[]>(url);
            setFiltersPublications(response.data);
            return { success: true, data: response.data };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al filtrar publicaciones';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const getFilteredServices = async (filters: ServiceFilters) => {
        setLoading(true);
        setError(null);

        try {
            let url = `${API_URL}/servicios`;

            const { nombre, precioMinimo, precioMaximo } = filters;
            const hasFilters = nombre || precioMinimo !== undefined || precioMaximo !== undefined;

            if (!hasFilters) {
                url += '/listar';
            } else if (nombre && precioMinimo !== undefined && precioMaximo !== undefined) {
                url += `/listarServiciosPorNombreYPrecioEntreMenorYMayor?nombre=${nombre}&precioMenor=${precioMinimo}&precioMayor=${precioMaximo}`;
            } else if (nombre) {
                url += `/listarServiciosPorNombre?nombre=${nombre}`;
            } else {
                url += '/listar';
            }

            const response = await axios.get<Servicio[]>(url);
            setFiltersServices(response.data);
            return { success: true, data: response.data };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al filtrar servicios';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const clearFilters = () => {
        setFiltersPublications([]);
        setFiltersServices([]);
        setError(null);
    };

    return {
        filtersPublications,
        filtersServices,
        loading,
        error,
        getFilteredPublications,
        getFilteredServices,
        clearFilters
    };
}