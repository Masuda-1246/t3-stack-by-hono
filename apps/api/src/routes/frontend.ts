import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { join } from 'path'

const distPath = './dist'
console.log('distPath:', distPath)

const frontendRoute = new Hono()

// 静的ファイル
frontendRoute.get('/assets/*', serveStatic({ root: distPath }))
// SPA用index.htmlフォールバック
frontendRoute.get('/*', serveStatic({ path: join(distPath, 'index.html') }))

export default frontendRoute