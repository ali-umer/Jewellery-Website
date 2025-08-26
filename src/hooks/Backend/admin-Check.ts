import { supabase } from "@/lib/supabaseClient";

export async function AdminCheck(): Promise<boolean> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return false;
    }

    const { data, error } = await supabase.rpc("is_admin", {
      p_user_id:user.id,
    });

    console.log("Admin check data:", data, "Error:", error);
    if (error) {
      return false;
    }

    return data === true;
  } catch {
    return false;
  }
}
