import React from 'react'
import AdminLoginForm from './login-form'

type Props = {}

export default function AdminLoginPage({}: Props) {
  return (
    <section className="flex-1 container px-4 flex justify-center items-center">
      <AdminLoginForm />
    </section>
  )
}