"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { checkAuth } from "@/hooks/Backend/login-Checker";
import { User, LogOut, Key, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default function AuthMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkAuth();
      setIsLoggedIn(result);
    };
    verifyAuth();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  const handleResetPassword = async () => {
    const { data } = await supabase.auth.getUser();
    const email = data?.user?.email;
    if (email) {
      await supabase.auth.resetPasswordForEmail(email);
      alert("Password reset email sent!");
      setMenuOpen(false);
    }
  };

  if (isLoggedIn === null) return null;

  return (
    <div className="relative" ref={menuRef} >
      {/* Profile Icon Button */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        title="Profile"
      >
        <User className="w-6 h-6 text-[var(--gold)]" />
      </button>


      {menuOpen && (
        <div className="absolute right-1 mt-6 w-45 bg-white rounded-1xl z-50 ">
          {!isLoggedIn ? (
            <>
             <Link href="/signUp" >
              <button className="flex items-center gap-2 px-4 py-2 w-full font-bold text-purple-900">
                <UserPlus className="w-5 h-5" />
                Sign Up
              </button>
              </Link>
              <Link href="/login" >
              <button className="flex items-center gap-2 px-4 py-2 w-full font-bold text-green-900 ">
                <LogIn className="w-5 h-5" />
                Login
              </button>
              </Link>
            </>
          ) : (
            <>

             <button
                onClick={handleResetPassword}
                className="flex items-center gap-2 px-4 py-2 w-full text-blue-500"
              >
                <Key className="w-5 h-5" />
                Reset Password
              </button>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 w-full text-red-500"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
             
            </>
          )}
        </div>
      )}
    </div>
  );
}

