import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { environment } from '../../environments/environment';

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
    environment.supabaseUrl,
    environment.supabaseKey
);

export const login = async () => {
    await supabase.auth.signInWithPassword({
        email: environment.testEmail,
        password: environment.testPwd,
    });
}