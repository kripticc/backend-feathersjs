// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { AnyZodObject } from "zod";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (schema: AnyZodObject): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    schema.parse(context.data);
    return context;
  };
}
