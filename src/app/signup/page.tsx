'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function Signup() {
    const router = useRouter()
    const [user, setUser] = useState({
        email:"",
        password:"",
        username:""
    })

    const [disabledButton, setDisabledButton] = useState(false)

    const [loading, setLoading] = useState(false)

    const onSignup = async() => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup Success", response.data)
            router.push("/login")
        } catch (error: any) {
            console.log("Signup Failed")
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user.email.length>0 && user.password.length>0 && user.username.length>0) {
            setDisabledButton(false)
        } else{
            setDisabledButton(true)
        }
    }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className='text-4xl mb-4'>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        id="username"
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        type="text"
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        type="email"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="password"
      />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 mb-4"
      >
        {disabledButton ? "No Signup" : "Signup"}
      </button>
      <Link href='/login'>Visit Login Page</Link>
    </div>
  );
}

export default Signup
