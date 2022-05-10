// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers'
import Redis from 'ioredis'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCache = (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const redis = new Redis()
    await redis.get(context.path)
    return context
  }
}
