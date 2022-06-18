// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers'
import speakeasy from '@levminer/speakeasy'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateAuthenticatorUri = (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    context.result.authenticatorUri = speakeasy.otpauthURL({
      secret: context.result.secret,
      label: context.result.userName
    })
    return context
  }
}
