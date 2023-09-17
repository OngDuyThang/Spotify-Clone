'use client'

import { useState } from "react"
import Button from "./Button"
import Modal from "./Modal"
import { Price, ProductWithPrice } from "@/types"
import { useUser } from "@/hooks/useUser"
import toast from "react-hot-toast"
import { postData } from "@/libs/helpers"
import { getStripe } from "@/libs/stripeClient"
import useSubscribeModal from "@/hooks/useSubscribeModal"

interface SubscribeModalProps {
    products: ProductWithPrice[]
}

function formatPrice(price: Price) {
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100)

    return priceString
}

export default function SubscribeModal({
    products
}: SubscribeModalProps) {

    const subscribeModal = useSubscribeModal()
    const [priceIdLoading, setPriceIdLoading] = useState<string>()
    const { user, isLoading, subscription } = useUser()

    function onChange(open: boolean) {
        if (!open) subscribeModal.onClose()
    }

    async function handleCheckout(price: Price) {
        setPriceIdLoading(price.id)

        if (!user) {
            setPriceIdLoading(undefined)
            return toast.error('You must be logged in!')
        }

        if (subscription) {
            setPriceIdLoading(undefined)
            return toast('You have already subscribed.')
        }

        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            })

            const stripe = await getStripe()
            stripe?.redirectToCheckout({ sessionId })
        } catch (error) {
            toast.error((error as Error)?.message)
        } finally {
            setPriceIdLoading(undefined)
        }
    }

    let content = <div className="text-center">
        No products available.
    </div>

    if (products.length) {
        content = <div className="text-center">
            {products.map(product => {
                if (!product.prices?.length) {
                    return (
                        <div key={product.id}>
                            No prices available.
                        </div>
                    )
                }

                return product.prices.map(price => (
                    <Button
                        className="mb-4"
                        key={price.id}
                        onClick={() => handleCheckout(price)}
                        disabled={isLoading || price.id === priceIdLoading}
                    >
                        {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                    </Button>
                ))
            })}
        </div>
    }
    console.log(user)
    if (subscription) {
        content = <div className="text-center">
            You have already subscribed.
        </div>
    }

    return (
        <Modal
            title="Only for premium accounts"
            description="Listen to music with Spotify"
            isOpen={subscribeModal.isOpen}
            onChange={onChange}
        >
            {content}
        </Modal>
    )
}