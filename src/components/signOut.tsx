"use client";

import { supabase } from "@/lib/supabaseClient"; // adjust your path
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
    >
      Sign Out
    </button>
  );
}
