import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

export default function useGetSongById(id?: string) {
    const [isLoading, setIsLoading] = useState(false)
    const [song, setSong] = useState<Song | undefined>(undefined)
    const { supabaseClient } = useSessionContext()

    useEffect(() => {
        if (!id) return

        setIsLoading(true)

        async function fetchSong() {
            const { data, error } = await supabaseClient.from('songs').select('*').eq('id', id).single()
            if (error) {
                setIsLoading(false)
                return toast.error(error.message)
            }
            setSong(data as Song)
            setIsLoading(false)
        }
        fetchSong()
    }, [id, supabaseClient])

    return useMemo(() => {
        return {
            isLoading,
            song
        }
    }, [isLoading, song])
}