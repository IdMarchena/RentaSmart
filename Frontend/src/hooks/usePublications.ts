import { useState, useEffect } from "react";
import axios from "axios";
import type { Publicacion } from "../types/entities";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:6000/api';

export const usePublications = () => {
    const [publications, setPublications] = useState<Publicacion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getPublications = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Publicacion[]>(`${API_URL}/publicaciones/listar`);
            setPublications(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al cargar publicaciones');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPublications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createPublication = async (publication: Partial<Publicacion>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post<Publicacion>(`${API_URL}/publicaciones/crear`, publication);
            setPublications(prev => [...prev, response.data]);
            return { success: true, data: response.data };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al crear publicación';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const deletePublication = async (publicationId: number) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${API_URL}/publicaciones/eliminarPorId/${publicationId}`);
            setPublications(prev => prev.filter(pub => pub.id !== publicationId));
            return { success: true };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al eliminar publicación';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const updatePublication = async (publicationId: number, publication: Partial<Publicacion>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put<Publicacion>(`${API_URL}/publicaciones/actualizarPorId/${publicationId}`, publication);
            setPublications(prev => prev.map(pub => pub.id === publicationId ? response.data : pub));
            return { success: true, data: response.data };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al actualizar publicación';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const getPublicationById = async (publicationId: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Publicacion>(`${API_URL}/publicaciones/obtenerPorId/${publicationId}`);
            return { success: true, data: response.data };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al obtener publicación';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const getPublicationsByUser = async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Publicacion[]>(`${API_URL}/publicaciones/obtenerPorUsuario/${userId}`);
            setPublications(response.data);
            return { success: true, data: response.data };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al obtener publicaciones del usuario';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    return {
        publications,
        loading,
        error,
        getPublications,
        createPublication,
        deletePublication,
        updatePublication,
        getPublicationById,
        getPublicationsByUser
    };
}