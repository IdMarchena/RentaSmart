import axios from "axios";
import { useState, useEffect } from "react";
import type { Servicio } from "../types/entities";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:6000/api/v1';

export const useService = () => {
    const [services, setServices] = useState<Servicio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getServices = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Servicio[]>(`${API_URL}/servicios/listar`);
            setServices(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al cargar servicios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createService = async (service: Partial<Servicio>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post<Servicio>(`${API_URL}/servicios/crear`, service);
            setServices(prev => [...prev, response.data]);
            return { success: true, data: response.data };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al crear servicio';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const deleteService = async (serviceId: number) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${API_URL}/servicios/eliminarPorId/${serviceId}`);
            setServices(prev => prev.filter(service => service.id !== serviceId));
            return { success: true };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al eliminar servicio';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const updateService = async (serviceId: number, service: Partial<Servicio>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put<Servicio>(`${API_URL}/servicios/actualizarPorId/${serviceId}`, service);
            setServices(prev => prev.map(s => s.id === serviceId ? response.data : s));
            return { success: true, data: response.data };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al actualizar servicio';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const getServiceById = async (serviceId: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Servicio>(`${API_URL}/servicios/obtenerPorId/${serviceId}`);
            return { success: true, data: response.data };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al obtener servicio';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const getServicesByUser = async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Servicio[]>(`${API_URL}/servicios/obtenerPorUsuario/${userId}`);
            setServices(response.data);
            return { success: true, data: response.data };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Error al obtener servicios del usuario';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    return {
        services,
        loading,
        error,
        getServices,
        createService,
        deleteService,
        updateService,
        getServiceById,
        getServicesByUser
    };
}