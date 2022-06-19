import z from 'zod'

export const userAuthSchema = z.object({
  strategy: z.string().default('jwt'),
  email: z.string().email({ message: 'Invalid email address' }),
  userName: z
    .string()
    .max(20, 'username cannot be longer than 20 characters')
    .and(z.string().regex(/^[a-zA-Z\d]+$/)),
  totp: z
    .string()
    .regex(/^\d+$/, 'Invalid TOTP')
    .and(
      z.string().length(6, 'Invalid TOTP length, expected exactly 6 digits')
    )
})
