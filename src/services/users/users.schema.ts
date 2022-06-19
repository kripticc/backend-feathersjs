import z from 'zod'

export const userSchema = z.object({
  userName: z
    .string()
    .max(20, 'Username cannot be longer than 20 characters')
    .and(z.string().regex(/^[a-zA-Z\d]+$/)),
  displayName: z
    .string()
    .max(20, 'Display name cannot be longer than 20 characters')
    .and(z.string().regex(/^[a-zA-Z\d]+$/)),
  email: z.string().email('Invalid email address')
})
