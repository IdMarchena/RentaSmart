import { useState } from 'react'
import { financiacionRepository } from '@/repositories'
import type { Financiacion } from '@/types/entitys'

export const useFinanciacion = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAll = async (): Promise<Financiacion[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await financiacionRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener financiaciones'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<Financiacion | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await financiacionRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener financiación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const create = async (data: Omit<Financiacion, 'id'>): Promise<Financiacion> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await financiacionRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear financiación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Omit<Financiacion, 'id'>): Promise<void> => {
    setLoading(true)
    setError(null)
    
    try {
      await financiacionRepository.update(id, data)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar financiación'
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
      await financiacionRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar financiación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos especializados
  const generatePaymentPlan = async (id: number): Promise<Financiacion[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await financiacionRepository.generatePaymentPlan(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al generar plan de pagos'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const simulatePaymentPlan = async (numeroCuotas: number, montoTotal: number, interes: number): Promise<Financiacion[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await financiacionRepository.simulatePaymentPlan(numeroCuotas, montoTotal, interes)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al simular plan de pagos'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const validateFinanciacion = async (id: number): Promise<boolean> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await financiacionRepository.validateFinanciacion(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al validar financiación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getAll,
    getById,
    create,
    update,
    remove,
    generatePaymentPlan,
    simulatePaymentPlan,
    validateFinanciacion
  }
}
