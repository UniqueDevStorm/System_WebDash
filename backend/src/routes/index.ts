import Router from 'koa-router'

const router = new Router()

router.get('/', (ctx) => {
  ctx.body = { happy: 'hacking' }
})

export default (ctx: any, next: any) => {
  router.routes()(ctx, next)
}
