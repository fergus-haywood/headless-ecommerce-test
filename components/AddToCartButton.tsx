import { addItemToCart } from "../data/cart"
import { useContext } from 'react'
import { SiteContext } from "../lib/siteContext"



export default function AddToCartButton({ variant, cart}: any) { 







  return ( 
    <button onClick={() => addToCartContext(variant.id, cart.id)} >
    Add to cart
  </button>
  )


}