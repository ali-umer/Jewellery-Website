"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BottomGradient from "./ui/bottomGradient";
import Image from "next/image";
import { loginUser } from "@/hooks/Backend/login";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { success, error: loginError, user } = await loginUser(email, password);

    if (!success) {
      setError(loginError?.message || "Something went wrong");
    } else {
      console.log("Login successful, userId:", user);
    }

    setLoading(false);
  };

  return (
    <div className="relative mx-auto mt-20 w-full max-w-md rounded-2xl bg-transparent p-6 shadow-xl ring-1 ring-[var(--gold)]">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/logo.png"
          alt="Login Logo"
          width={180}
          height={140}
          className="rounded-full"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSignIn}
        className="max-w-md mx-auto mt-10 space-y-4 p-6 bg-transparent rounded-2xl shadow-lg"
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Button with BottomGradient */}
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full h-11 rounded-md bg-gradient-to-br from-black to-neutral-700 font-medium text-white shadow-md hover:shadow-lg transition"
        >
          {loading ? "Signing in..." : "Sign In"}
          <BottomGradient />
        </button>
      </form>

      {/* ✅ Link to Sign Up */}
      <div className="mt-4 text-center text-sm text-white">
        Don’t have an account?{" "}
        <Link href="/SignUp" className="text-amber-500 hover:underline">
          Create a new account
        </Link>
      </div>
    </div>
  );
}
