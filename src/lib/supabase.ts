export interface EnquiryPayload {
  name: string;
  phone: string;
  category?: string;
  area?: string;
  message?: string;
  target_phone?: string;
}

export async function saveEnquiryToSupabase(payload: EnquiryPayload) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Supabase credentials not configured yet in environment variables
    return { success: false, reason: "NOT_CONFIGURED" };
  }

  try {
    // Dynamic import to avoid bundling @supabase/supabase-js in critical path
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase.from("enquiries").insert([
      {
        name: payload.name,
        phone: payload.phone,
        category: payload.category || "General Enquiry",
        area: payload.area || null,
        message: payload.message || null,
        target_phone: payload.target_phone || null,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.warn("Supabase insert notice:", error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.warn("Supabase submission error:", err);
    return { success: false, error: err };
  }
}
