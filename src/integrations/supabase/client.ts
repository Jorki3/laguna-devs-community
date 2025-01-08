import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Create the Supabase client with hardcoded values for this project
export const supabase = createClient<Database>(
  "https://xahkzuptjpoqlcppssum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhaGt6dXB0anBvcWxjcHBzc3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTg5ODksImV4cCI6MjAyNTIzNDk4OX0.0e34R8mGz8LXpxkUnQBPC-aqh4lJqKwIzWwpSJ4YN-k"
);