import { useState } from 'react'
import { facturaRepository } from '@/repositories'
import type { Factura } from '@/types/entitys'

export const useFactura = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAll = async (): Promise<Factura[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await facturaRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener facturas'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<Factura | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await facturaRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener factura'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const create = async (data: Omit<Factura, 'id'>): Promise<Factura> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await facturaRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear factura'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Partial<Factura>): Promise<Factura> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await facturaRepository.update(id, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar factura'
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
      await facturaRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar factura'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos especializados
  const getByUsuarioId = async (idUsuario: number): Promise<Factura[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await facturaRepository.getByUsuarioId(idUsuario)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener facturas por usuario'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByContratoId = async (idContrato: number): Promise<Factura[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await facturaRepository.getByContratoId(idContrato)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener facturas por contrato'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const generateFacturaForContrato = async (idContrato: number): Promise<Factura> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await facturaRepository.generateFacturaForContrato(idContrato)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al generar factura para contrato'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getFacturaPagoStatus = async (id: number): Promise<string> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await facturaRepository.getFacturaPagoStatus(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener estado de pago de factura'
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
    getByUsuarioId,
    getByContratoId,
    generateFacturaForContrato,
    getFacturaPagoStatus
  }
}
