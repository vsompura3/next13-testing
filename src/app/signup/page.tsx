'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

export default function SignUpPage() {
  const router = useRouter()
  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    const { name, username, email, password } = user
    if (name && username && email && password) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [user])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const { data } = await axios.post('/api/users/signup', user)
      console.log('RECEIVED: ', data)
      toast.success(data.message, { duration: 3000 })
      router.push('/login')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-4 gap-8">
      <h1 className="text-3xl">SignUp</h1>
      <form className="min-w-[45ch] grid gap-8" onSubmit={handleSubmit}>
        <div className="grid gap-1">
          <label className="text-xl" htmlFor="name">
            Name:
          </label>
          <input
            className="text-slate-800 w-full text-lg bg-slate-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-4 focus:ring-blue-600/80 focus:border-transparent"
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            value={user.name}
            onChange={e => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-1">
          <label className="text-xl" htmlFor="uname">
            Username:
          </label>
          <input
            className="text-slate-800 w-full text-lg bg-slate-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-4 focus:ring-blue-600/80 focus:border-transparent"
            type="text"
            name="uname"
            id="uname"
            placeholder="john-doe"
            value={user.username}
            onChange={e => setUser({ ...user, username: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-1">
          <label className="text-xl" htmlFor="email">
            Email:
          </label>
          <input
            className="text-slate-800 w-full text-lg bg-slate-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-4 focus:ring-blue-600/80 focus:border-transparent"
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
            className="text-slate-800 w-full text-lg bg-slate-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-4 focus:ring-blue-600/80 focus:border-transparent"
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
          {isLoading ? (
            <span className="flex justify-center items-center gap-2">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      <div className="flex gap-2">
        <span>Already have an account?</span>
        <Link className="text-blue-600 underline" href="/login">
          LogIn.
        </Link>
      </div>
      <Toaster />
    </div>
  )
}
