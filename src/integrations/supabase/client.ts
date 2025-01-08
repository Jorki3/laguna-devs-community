import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = "https://xahkzuptjpoqlcppssum.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhaGt6dXB0anBvcWxjcHBzc3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTg5ODksImV4cCI6MjAyNTIzNDk4OX0.0e34R8mGz8LXpxkUnQBPC-aqh4lJqKwIzWwpSJ4YN-k";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);