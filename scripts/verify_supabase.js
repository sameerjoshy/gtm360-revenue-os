
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual .env parsing
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

const getEnv = (key) => {
    const match = envContent.match(new RegExp(`${key}=(.*)`));
    return match ? match[1].trim() : null;
};

const url = getEnv('VITE_SUPABASE_URL');
const key = getEnv('VITE_SUPABASE_ANON_KEY');

if (!url || !key) {
    console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
    process.exit(1);
}

console.log(`Testing connection to ${url}...`);

const supabase = createClient(url, key);

async function test() {
    try {
        // Just check session or basic auth health
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        console.log('Success! Connection established. Auth service is reachable.');
    } catch (err) {
        console.error('Connection failed:', err.message);
        process.exit(1);
    }
}

test();
