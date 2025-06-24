'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '@/graphql/mutations'
import { z } from 'zod'
import { toast } from 'react-toastify'

// Zod validation schema
const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })

  const [loginUser, { loading }] = useMutation(LOGIN_USER)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = schema.safeParse(form)

    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message)
      return
    }

    try {
      const res = await loginUser({ variables: form })
      const token = res.data.loginUser.token
      localStorage.setItem('token', token)
      toast.success('Login successful!')
    } catch (err: any) {
      toast.error(err.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
