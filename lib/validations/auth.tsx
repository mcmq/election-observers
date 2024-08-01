import { z } from 'zod'

export const loginFormSchema = z.object({
  id: z
    .string()
    .min(1, 'Enter your ID'),
  password: z
    .string()
    .min(1, 'Enter your password')
})

export const newUserFormSchema = z.object({
  id: z
    .string()
    .min(3, 'Enter ID'),
  name: z
    .string()
    .min(3, 'Enter full name'),
  title: z
    .string()
    .min(3, 'Enter title'),
  district: z
    .string()
    .min(2, 'Enter district'),
  region: z
    .string()
    .min(2, 'Enter region'),
  dor: z
    .date({ required_error: 'Enter date of register' }),
  image: z
    .instanceof(File)
    .optional(),
  email: z
    .string()
    .email('Enter a valid email'),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number'),
  role: z
    .string()
    .min(2, 'Select role'),
  password: z
    .string()
    .min(1, 'Enter password')
})

export const changePasswordSchema = z.object({
  passowrd: z
    .string()
    .min(5, 'New password must be at least 6 characters long'),
  confirm: z.string()
}).refine(data => data.passowrd === data.confirm, {
  message: 'Passwords do not match',
  path: ['confirm']
})