'use client'

import { Database } from '@/types_db'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

interface SupabaseProviderProps {
    children: React.ReactNode
}

export default function SupabaseProvider({
    children
}: SupabaseProviderProps) {

    const [supabaseClient, setSupabaseClient] = useState(() =>
        createClientComponentClient<Database>()
    )

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )
}