import { handle } from 'hono-adapter-aws-lambda'
import app from './api.js'

export const handler = handle(app) 