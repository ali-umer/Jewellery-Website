"use client";
import React, { useState,useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { signUpUser } from "@/hooks/Backend/sign-Up";
import BottomGradient from "./ui/bottomGradient";
import Link from "next/link";
import UserMessage from "@/components/userMessages";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { success, error } = await signUpUser(email, password, name);
      if (!success) {
        setError(error?.message || "Something went wrong");
        setSuccess(false);
      } else {
        console.log("✅ User signed up successfully!");
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error occurred.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Auto-redirect on successful signup
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 1500); // wait 1.5s so message is visible
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  return (
    <div className="relative mx-auto mt-20 w-full max-w-md rounded-2xl bg-transparent p-6 shadow-xl ring-1 ring-[var(--gold)]">
      {/* ✅ Centered Logo */}
      <div className="flex justify-center mb-6">
         <Image
                 src="/PashaLogo.png"
                 alt="Login Logo"
                 width={400}
                 height={200}
                 className="rounded-full"
               />
      </div>

      {error && <UserMessage success={false} message={error} />}
      {success && <UserMessage success={true} message="Verification Link Sent to your email" />}

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Input
            id="name"
            placeholder="Enter your full name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Input
            id="email"
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4 relative">
          <Input
            id="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-500 dark:text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <BottomGradient />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4 relative">
          <Input
            id="confirmPassword"
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-500 dark:text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <BottomGradient />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-lg dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up →"}
          <BottomGradient />
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-white">
        Already have an account?{" "}
        <Link href="/login" className="text-amber-500 hover:underline">
          Login In
        </Link>
      </div>
    </div>
  );
}


const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
