
import { SiteContext, useAddToCart } from "../lib/siteContext"



export default function AddToCartButton({ product, variant }:any) { 

  const addToCart = useAddToCart()


  return ( 
    <button onClick={() => addToCart(product, variant)} >
    Add to cart
  </button>
  )


}