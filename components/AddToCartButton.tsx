
import { SiteContext, useAddToCart } from "../lib/siteContext"



export default function AddToCartButton(product: any) { 

  const addToCart = useAddToCart()





  return ( 
    <button onClick={() => addToCart(product)} >
    Add to cart
  </button>
  )


}