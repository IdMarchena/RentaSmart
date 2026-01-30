import { useState, useEffect } from 'react'
import { contratoRepository } from '@/repositories'
import { useAuthContext } from '../context/AuthContext'
import { ContratoService } from '@/services/ContratoService'
import { BackendContratoRepository } from '@/repositories/Contrato/ContratoBackendRepository'
import { BackendFinanciacionRepository } from '@/repositories/Financiacion/FinanciacionBackendRepository'
import { BackendInmuebleRepository } from '@/repositories/inmuebles/InmuebleRepository.backend'
import { BackendUbicacionRepository } from '@/repositories/Ubicacion/UbicacionBackendRepository';import type { Contrato, Financiacion } from '@/types/entitys'


export const useContrato = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contratos, setContratos] = useState<Contrato[]>([])
  const { user } = useAuthContext()
  

  const repoContrato = new BackendContratoRepository();
  const repoFinanciacion = new BackendFinanciacionRepository();
  const repoInmueble = new BackendInmuebleRepository();
  const repoUbicacion = new BackendUbicacionRepository(); // <--- 1. Crear la instancia real
  
  const contratoService = new ContratoService(
    repoInmueble as any,
    repoFinanciacion as any,
    repoContrato as any ,
repoUbicacion  );

  // Cargar contratos automáticamente al montar el componente
  useEffect(() => {
    getAll();
  }, []);

  const getAll = async (): Promise<Contrato[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await contratoRepository.getAll()
      const fullContratos = await Promise.all(
        result.map(contrato => contratoService.getFullContrato(contrato.id))
      );
      setContratos(fullContratos.filter(c => c !== null) as Contrato[])
      return fullContratos.filter(c => c !== null) as Contrato[]
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener contratos'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<Contrato | null> => {
    setLoading(true)
    setError(null)
    try {
      const result = await contratoService.getFullContrato(id);
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener contrato'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }
  const createContratoCompleto = async (data: {
    contrato: any,
    financiacion: Omit<Financiacion, 'id'>
  }) => {
    setLoading(true)
    setError(null)
    console.group("🚀 PROCESO: Creación Contrato Completo");
    console.log("1. Datos crudos recibidos del componente:", data);

    try {
      if (!user?.id) throw new Error("Sesión no válida");
      console.group("💰 PASO 1: Persistiendo Financiación");
      console.log("Enviando a repoFinanciacion.create:", data.financiacion);
      
      const financiacionGuardada = await repoFinanciacion.create(data.financiacion);

      console.log("Resultado del Servidor (Financiación):", financiacionGuardada);

      if (!financiacionGuardada || financiacionGuardada.id === 0) {
        console.error("❌ ERROR: El servidor devolvió ID 0. Hibernate tratará esto como una fila existente inexistente.");
      }
      console.groupEnd();
      
      console.group("📝 PASO 2: Persistiendo Contrato");

      const contratoDto = {
        contenido: data.contrato.contenido,
        idUsuarioArrendatario: data.contrato.idUsuarioArrendatario,
        idUsuarioArrendador: data.contrato.idUsuarioArrendador,
        idInmueble: data.contrato.idInmueble,
        idFinanciacion: financiacionGuardada.id,
        fechaInicio: data.contrato.fechaInicio,
        fechaFinalizacion: data.contrato.fechaFinalizacion,
        precio: data.contrato.precio,
        estadoContrato: data.contrato.estadoContrato,
        deposito: data.contrato.deposito,
        clausulasEspeciales: data.contrato.clausulasEspeciales,
        diaDePago: data.contrato.diaDePago 
      };
      console.log("📝 Creando contrato legal...");
      const resContratoBase = await repoContrato.create(contratoDto as any);

      console.log("🔄 Hidratando contrato para la UI...");
      const contratoFull = await contratoService.getFullContrato(resContratoBase.id);

      return { success: true, data: contratoFull };
    } catch (err: any) {
      console.group("❌ ERROR EN EL FLUJO");
      console.error("Detalle técnico:", err);
      console.log("Payload en fallo:", data);
      console.groupEnd();
      const msg = err.message || 'Error al legalizar el contrato';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
      console.groupEnd();
    }
  }

  const create = async (data: Omit<Contrato, 'id'>): Promise<Contrato> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await contratoRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear contrato'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Partial<Contrato>): Promise<Contrato> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await contratoRepository.update(id, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar contrato'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: number): Promise<void> => {
    setLoading(true)
    setError(null)
    
    try {
      await contratoRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar contrato'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos especializados
  const getByUsuarioId = async (idUsuario: number): Promise<Contrato[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await contratoRepository.getByUsuarioId(idUsuario)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener contratos por usuario'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

// Dentro de useContrato.ts
const getByArrendadorId = async (idArrendador: number): Promise<Contrato[]> => {
  setLoading(true);
  setError(null);
  
  try {
    const result = await contratoRepository.getByArrendadorId(idArrendador);
    
    // IMPORTANTE: Asegurarnos de que cada contrato pase por el servicio de hidratación
    const fullContratos = await Promise.all(
      result.map(async (contrato) => {
        const full = await contratoService.getFullContrato(contrato.id);
        return full;
      })
    );

    const validContratos = fullContratos.filter(c => c !== null) as Contrato[];
    
    // Actualizamos el estado interno del hook
    setContratos(validContratos);
    
    return validContratos;
  } catch (err: any) {
    setError(err.message || 'Error al obtener contratos');
    return [];
  } finally {
    setLoading(false);
  }
};

  const getByInmuebleId = async (idInmueble: number): Promise<Contrato[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await contratoRepository.getByInmuebleId(idInmueble)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener contratos por inmueble'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByEstado = async (estado: string): Promise<Contrato[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await contratoRepository.getByEstado(estado)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener contratos por estado'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getContratosActivosArrendador = async (idArrendador: number): Promise<Contrato[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await contratoRepository.getContratosActivosArrendador(idArrendador)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener contratos activos como arrendador'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getContratosFinalizadosArrendador = async (idArrendador: number): Promise<Contrato[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await contratoRepository.getContratosFinalizadosArrendador(idArrendador)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener contratos finalizados como arrendador'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getContratosActivosArrendatario = async (idArrendatario: number): Promise<Contrato[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await contratoRepository.getContratosActivosArrendatario(idArrendatario)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener contratos activos como arrendatario'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getContratosFinalizadosArrendatario = async (idArrendatario: number): Promise<Contrato[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await contratoRepository.getContratosFinalizadosArrendatario(idArrendatario)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener contratos finalizados como arrendatario'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getContratosPorMes = async (idArrendador: number): Promise<Map<string, number>> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await contratoRepository.getContratosPorMes(idArrendador)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener contratos por mes'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getIngresoArrendador = async (idArrendador: number): Promise<number> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await contratoRepository.getIngresoArrendador(idArrendador)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener ingresos del arrendador'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }
  const getContratosProximosAVencer = async (
  idUsuario: number,
  dias: number
): Promise<Contrato[]> => {
  setLoading(true)
  setError(null)

  try {
    const result = await contratoRepository.getContratosProximosAVencer(
      idUsuario,
      dias
    )
    return result
  } catch (err: any) {
    const errorMessage =
      err.message || 'Error al obtener contratos próximos a vencer'
    setError(errorMessage)
    throw err
  } finally {
    setLoading(false)
  }
}
const contarContratosComoArrendatario = async (
  idArrendatario: number
): Promise<number> => {
  setLoading(true)
  setError(null)

  try {
    const result =
      await contratoRepository.contarContratosComoArrendatario(idArrendatario)
    return result
  } catch (err: any) {
    const errorMessage =
      err.message || 'Error al contar contratos como arrendatario'
    setError(errorMessage)
    throw err
  } finally {
    setLoading(false)
  }
}


  return {
    loading,
    error,
    contratos,
    getAll,
    getById,
    create,
    update,
    remove,
    getByUsuarioId,
    getByArrendadorId,
    getByInmuebleId,
    getByEstado,
    getContratosActivosArrendador,
    getContratosFinalizadosArrendador,
    getContratosActivosArrendatario,
    getContratosFinalizadosArrendatario,
    getContratosPorMes,
    getIngresoArrendador,
    getContratosProximosAVencer,
    contarContratosComoArrendatario,
    createContratoCompleto,
  }
}
