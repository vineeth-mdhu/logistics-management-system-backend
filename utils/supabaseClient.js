const supabaseClient=require('@supabase/supabase-js')
const supabaseUrl = "https://pxsfvqytpqheggfqtkbg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU0MzUxMCwiZXhwIjoxOTU5MTE5NTEwfQ.SX4Inr5L-CiWayWBZ1qks_6dTycliim5Pxw6DUjQS3w"

module.exports = supabaseClient.createClient(supabaseUrl, supabaseAnonKey)