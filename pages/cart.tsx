import { useState, useContext } from 'react'
import { SiteContext, useUpdateCart } from '../lib/siteContext'




export default function Cart() { 


  const { context, setContext } = useContext(SiteContext)
  const cartItems = context.cart.lineItems

  const updateCart = useUpdateCart()

  return ( 
    <>

    <h1>  cart </h1>

    <button onClick={() => updateCart("gid://shopify/ProductVariant/44287374197011", 69)}>
      Update Cart
      </button>

    </>


  )


}