import type { Handle } from '@sveltejs/kit'
import { logger } from '$lib/logger'

export const handle: Handle = async ({ event, resolve }) => {
  const start = Date.now()

  // Log incoming request
  logger.info({
    method: event.request.method,
    url: event.url.pathname,
    ip: event.getClientAddress?.() || 'undefined',
    msg: 'Incoming request'
  })

  // Execute request
  const response = await resolve(event)

  // Log completion
  const duration = Date.now() - start
  logger.info({
    status: response.status,
    method: event.request.method,
    url: event.url.pathname,
    duration,
    msg: 'Response sent'
  })

  return response
}
