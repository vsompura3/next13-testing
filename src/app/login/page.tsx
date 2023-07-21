'use client'
import { axios } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    const { email, password } = user
    if (email && password) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [user])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    toast.success('Login successful!', { duration: 1500 })
    try {
    } catch (error) {}
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-4 gap-8">
      <h1 className="text-3xl">Login</h1>
      <form className="min-w-[45ch] grid gap-8" onSubmit={handleSubmit}>
        <div className="grid gap-1">
          <label className="text-xl" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full text-slate-800 text-lg bg-slate-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-4 focus:ring-blue-600/80 focus:border-transparent"
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xl" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full text-slate-800 text-lg bg-slate-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-4 focus:ring-blue-600/80 focus:border-transparent"
            type="password"
            name="password"
            id="password"
            placeholder="jkdjhf76addjy@+_3"
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className={`rounded bg-blue-600 text-white py-2 px-4 text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white focus:ring-inset focus:border-transparent ${
            isDisabled && 'opacity-50 cursor-not-allowed'
          }`}
        >
          LogIn
        </button>
      </form>
      <div className="flex gap-2">
        <span>Do not have an account?</span>
        <Link className="text-blue-600 underline" href="/signup">
          SignUp Here.
        </Link>
      </div>
      <Toaster />
    </div>
  )
}
