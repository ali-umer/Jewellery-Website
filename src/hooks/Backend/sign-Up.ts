import { supabase } from "@/lib/supabaseClient";

export async function signUpUser(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
  email: email,
  password: password,
  options: {
    data: {
      displayName: name
    }
  }
});

   if(data?.user) {
       console.log("User created:", data);
   }
  if (error) {
    console.error("Signup error:", error.message);
    return { success: false, error };
  }


  return { success: true, user: data.user };
}
