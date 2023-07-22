'use client'

import axios from 'axios'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function VerifyEmailPage() {
  const [token, setToken] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = useCallback(async () => {
    try {
      await axios.post('/api/users/verifyemail', { token })
      setIsVerified(true)
    } catch (error: any) {
      setError(true)
      toast.error(error.response.data.message)
    }
  }, [token])

  useEffect(() => {
    const tokenFromURL = window.location.search.split('=')[1]
    setToken(tokenFromURL || '')
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token, verifyUserEmail])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-4 gap-8">
      {token ? (
        <div>
          <h1 className="text-3xl">Email Verification in progress</h1>
          <p>Please wait...</p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl">Create an account</h1>
          <Link className="text-blue-600 hover:underline" href="/signup">
            Craete account
          </Link>
        </div>
      )}
      {isVerified && (
        <div>
          <h1 className="text-3xl">Email Verified</h1>
          <Link className="text-blue-600 hover:underline" href="/login">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h1 className="text-3xl">Email Verification Failed</h1>
          <Link className="text-blue-600 hover:underline" href="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  )
}
