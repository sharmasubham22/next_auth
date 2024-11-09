'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function Profile() {
  const router = useRouter();
  const [data, setData] = useState("NA")

  const getData = async() => {
    try {
      const response = await axios.post('/api/users/about');
      setData(response.data.data._id)
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const logout = async() => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success")
      router.push("/login")
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl mb-4">My Details</h1>
      <h2>
        {data === "NA" ? (
          "Nothing to display"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="mt-4 bg-blue-400 hover:bg-blue-700 text-white p-2 rounded-lg"
      >
        Logout
      </button>
      <button
        onClick={getData}
        className="mt-4 bg-green-400 hover:bg-green-700 text-white p-2 rounded-lg"
      >
        Get User Data
      </button>
    </div>
  );
}

export default Profile
