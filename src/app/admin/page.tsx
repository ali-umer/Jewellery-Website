
import { notFound } from "next/navigation";
import {supabase } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import CircleButton from "@/components/adminComponent/buttons";

export default async function AdminPage() {
  
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <CircleButton />
    </div>
  );
}
