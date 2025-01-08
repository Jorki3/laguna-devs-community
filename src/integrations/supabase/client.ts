import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Cargar las claves desde variables de entorno
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Crear el cliente de Supabase
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
