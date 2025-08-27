import { supabase } from "@/lib/supabaseClient";

export async function checkAuth(): Promise<boolean> {
  try {
    const { data } = await supabase.auth.getSession();
    if(data?.session?.user.is_anonymous) return false;
    return !!data.session;
  } catch (error) {
    console.error("Error checking auth:", error);
    return false;
  }
}

