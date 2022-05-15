// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers'
import QRCode from 'qrcode'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateQrCode = (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    context.result.qrCode = await QRCode.toDataURL(context.result.authenticatorUri)
    return context
  }
}
