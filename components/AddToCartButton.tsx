
import { SiteContext, useAddToCart } from "../lib/siteContext"



export default function AddToCartButton({ variant, quantity}: any) { 

  const addToCart = useAddToCart()





  return ( 
    <button onClick={() => addToCart(variant , quantity)} >
    Add to cart
  </button>
  )


}