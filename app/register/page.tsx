'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '@/graphql/mutations'
import { z } from 'zod'
import { toast } from 'react-toastify'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '' })

  const [registerUser, { loading }] = useMutation(REGISTER_USER)

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
      const res = await registerUser({ variables: form })
      toast.success('Registration successful!')
      console.log(res.data.registerUser)
    } catch (err: any) {
      toast.error(err.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
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
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}
