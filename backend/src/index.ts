import Koa from 'koa'
import json from 'koa-json'
import { buildError } from './utils/response'
import logger from 'koa-logger'
import reload from 'koa-reload-middleware'

const app = new Koa()

app.use(logger())

app.use(async (ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    ctx.status = ctx.status || 500
    if (ctx.status === 404) {
      app.use(
        json({
          pretty: false,
        }),
      )

      ctx.body = buildError({ code: 404, message: 'Not Found' })
    } else {
      ctx.body = buildError({ code: ctx.status, message: err.message })
    }
  }
})

app.use(reload(async () => {
  return import('./routes')
})).listen(8080, () => console.log('Listening.'))
