// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers'
import bcrypt from 'bcrypt'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const hashEmails = (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    context.data.email = await bcrypt.hash(context.data.email, context.app.get('saltOrRound'))
    return context
  }
}
