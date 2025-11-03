import { PRIVATE_LOGGING_HOST, PRIVATE_LOGGING_PASSWORD, PRIVATE_LOGGING_PROJECT, PRIVATE_LOGGING_USERNAME } from '$env/static/private'
import pino from 'pino'
import { pinoLoki } from 'pino-loki'

const lokiTransport = pinoLoki({
  batching: true,
  interval: 5, // send logs every 5 seconds
  host: PRIVATE_LOGGING_HOST, // e.g. https://logs.example.com
  basicAuth: { username: PRIVATE_LOGGING_USERNAME, password: PRIVATE_LOGGING_PASSWORD },
  labels: { app: PRIVATE_LOGGING_PROJECT, env: process.env.NODE_ENV || 'development' }
})

export const logger = pino(
  {
    level: 'info',
  },
  lokiTransport
)
