import { handle } from 'hono-adapter-aws-lambda'
import app from './index.js'

export const webHandler = handle(app)