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
    .min(3, 'Enter user\'s ID'),
  name: z
    .string()
    .min(3, 'Enter user\'s name'),
  pob: z
    .string()
    .min(3, 'Enter place of birth'),
  dob: z
    .date({ required_error: 'Enter date of birth' }),
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
    .min(1, 'Enter user\'s password')
})