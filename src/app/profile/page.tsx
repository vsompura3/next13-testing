'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState<any>(null)

  const getUserDetails = async () => {
    const { data } = await axios.get('/api/users/me')
    setData(data)
  }

  const handleClick = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout Success')
      router.push('/login')
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-4 gap-8">
      <h1 className="text-2xl font-semibold">Profile Page</h1>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:bg-red-600 active:bg-red-700 hover:shadow-md active:shadow-none transition duration-300 ease-in-out"
          onClick={handleClick}
        >
          LogOut
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:bg-green-600 active:bg-green-700 hover:shadow-md active:shadow-none transition duration-300 ease-in-out"
          onClick={getUserDetails}
        >
          Get Profile
        </button>
      </div>
      <div className="grid">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Name</span>
            <span className="font-semibold">Email</span>
            <span className="font-semibold">Role</span>
          </div>
          <div className="flex flex-col gap-2">
            {data && (
              <>
                <span>{data.name}</span>
                <span>{data.email}</span>
                <span>{data.username}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
