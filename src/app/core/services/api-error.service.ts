import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiErrorService {
  getErrorMessage(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'Ocurrió un error inesperado.';
    }

    const payload = error.error as { message?: string; errors?: Record<string, string[] | string> } | null;

    if (payload?.message) {
      return payload.message;
    }

    if (payload?.errors) {
      const firstKey = Object.keys(payload.errors)[0];
      const firstError = firstKey ? payload.errors[firstKey] : null;
      if (Array.isArray(firstError) && firstError.length > 0) {
        return firstError[0];
      }
      if (typeof firstError === 'string' && firstError.trim()) {
        return firstError;
      }
      return 'Error de validación.';
    }

    switch (error.status) {
      case 0:
        return 'No se pudo conectar con el servidor.';
      case 400:
        return 'Solicitud inválida.';
      case 401:
        return 'Sesión expirada o credenciales incorrectas.';
      case 403:
        return 'No tienes permisos para realizar esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 422:
        return 'Error de validación.';
      case 500:
        return 'Error interno del servidor.';
      default:
        return 'Ocurrió un error inesperado.';
    }
  }
}
