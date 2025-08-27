"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AnonUserProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAnonUser = async () => {
      // check current session (safe — doesn’t throw if missing)
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.error("Error fetching session:", error);

      if (!session) {
        // no session found → create anonymous user
        const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously();
        if (anonError) {
          console.error("Anon sign-in failed:", anonError.message);
        } else if (anonData) {
          console.log("✅ Anonymous user created:", anonData.user.id);
        }
      } else {
        console.log("ℹ️ Existing session:", session.user.id);
      }

      setLoading(false);
    };

    initAnonUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
