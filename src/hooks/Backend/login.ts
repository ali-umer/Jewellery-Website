import { supabase } from "@/lib/supabaseClient";

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    return { success: false, error };
  }

  if (data?.user) {
    console.log("User logged in:", data.user);
  }

  return { success: true,user: data.user.id };
}
