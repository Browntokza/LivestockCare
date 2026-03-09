import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://jlkivxhiwalwplrykqze.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVjMjQzYTM5LTBiYTctNGUzMS1hMjk2LTBjNzcxMzIxYWFhYyJ9.eyJwcm9qZWN0SWQiOiJqbGtpdnhoaXdhbHdwbHJ5a3F6ZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcyODk2NDkyLCJleHAiOjIwODgyNTY0OTIsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.-6wK5MGy1TbCfKrnCGAidBjDM47wmVXKbGtjcIgUrc8';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };