"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AnonUserProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAnonUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error.message);
        setLoading(false);
        return;
      }

      // If no session, create anonymous user
      if (!session) {
        const { error: anonError } = await supabase.auth.signInAnonymously();
        if (anonError) {
          console.error("Anonymous sign-in failed:", anonError.message);
        }
      }

      setLoading(false);
    };

    initAnonUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
