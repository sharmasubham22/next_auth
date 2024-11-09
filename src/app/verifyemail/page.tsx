'use client'

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Verify() {
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUser = async() => {
    try {
      await axios.post("/api/users/verify", {token})
      setVerified(true)
      setError(false)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  }

  useEffect(()=>{
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")

  }, [])

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUser();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl mb-4">Verify User's Email Address</h1>
      <h2 className='text-red-600'>{token ? `${token}` : "No Token Found"}</h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Login Here</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
}

export default Verify
