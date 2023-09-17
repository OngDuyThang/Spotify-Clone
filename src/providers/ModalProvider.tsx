'use client'

import AuthModal from "@/components/AuthModal"
import Modal from "@/components/Modal"
import SubscribeModal from "@/components/SubscribeModal"
import UploadModal from "@/components/UploadModal"
import { ProductWithPrice } from "@/types"
import { useEffect, useState } from "react"

interface ModalProviderProps {
    products: ProductWithPrice[]
}

export default function ModalProvider({
    products
}: ModalProviderProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <div>
            <AuthModal />
            <UploadModal />
            <SubscribeModal products={products} />
        </div>
    )
}