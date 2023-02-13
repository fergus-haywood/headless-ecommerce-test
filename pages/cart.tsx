import { useState, useContext } from 'react'
import { SiteContext, useUpdateCart} from '../lib/siteContext'
import CartProductItem from '../components/CartProductItem'
import Link from 'next/link'



export default function Cart() { 
// @ts-ignore
  const { context, setContext } = useContext(SiteContext)


  const{ cart } = context
  const checkoutUrl = context.cart.checkoutUrl




  return ( 
    <>

    <h1>  cart </h1>

      {cart.lineItems.map((product:any) => (

        <CartProductItem key={product.variantId} product={product} />
        )
      )}
      <br />
        {checkoutUrl && 
      <Link href={checkoutUrl}>
        Checkout
      </Link>
        }

    </>
  )


}