import { env } from '$env/dynamic/private'
import pino from 'pino'
import { pinoLoki } from 'pino-loki'

const loggingConfigured = Boolean(
  env.PRIVATE_LOGGING_HOST &&
  env.PRIVATE_LOGGING_USERNAME &&
  env.PRIVATE_LOGGING_PASSWORD &&
  env.PRIVATE_LOGGING_PROJECT
)

export const logger = loggingConfigured
  ? pino(
      { level: 'info' },
      pinoLoki({
        batching: true,
        interval: 5,
        host: env.PRIVATE_LOGGING_HOST,
        basicAuth: {
          username: env.PRIVATE_LOGGING_USERNAME,
          password: env.PRIVATE_LOGGING_PASSWORD
        },
        labels: {
          app: env.PRIVATE_LOGGING_PROJECT,
          env: process.env.NODE_ENV || 'development'
        }
      })
    )
  : pino({ level: 'silent' })
