"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [disabledButton, setDisabledButton] = useState(false);

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl mb-4">{loading ? "Processing" : "Login"}</h1>
      <hr />
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
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 mb-4"
      >
        {disabledButton ? "No Login" : "Login"}
      </button>
      <Link href="/signup">Visit Signup Page</Link>
    </div>
  );
}

export default Login;
