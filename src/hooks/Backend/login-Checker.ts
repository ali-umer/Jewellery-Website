"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export function useAuthCheck(redirectTo: string = "/login") {
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push(redirectTo);
      } else {
        setAuthChecked(true);
      }
    };

    checkUser();
  }, [router, redirectTo]);

  return authChecked;
}
