"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BottomGradient from "./ui/bottomGradient";
import Image from "next/image";
import { loginUser } from "@/hooks/Backend/login";
import UserMessage from "@/components/userMessages";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { success, error: loginError, user } = await loginUser(email, password);

    if (!success) {
      setError(loginError?.message || "Something went wrong");
      setSuccess(false);
    } else {
      console.log("Login successful, userId:", user);
      setSuccess(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [success, router]);

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

      {/* ✅ Messages */}
      {error && <UserMessage success={false} message={error} />}
      {success && <UserMessage success={true} message="Successfully logged in! Redirecting..." />}

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

      <div className="mt-4 text-center text-sm text-white">
        Don’t have an account?{" "}
        <Link href="/SignUp" className="text-amber-500 hover:underline">
          Create a new account
        </Link>
      </div>
    </div>
  );
}
