
import { SiteContext, useAddToCart } from "../lib/siteContext"



export default function AddToCartButton({ product, variant, available }:any) { 

  const addToCart = useAddToCart()


  return ( 

<>

{ available ? 
      <button onClick={() => addToCart(product, variant)} >
      Add to cart
      </button> 
:

      <button> 
      Sold Out
      </button>
}
    
</>
    
    
    
  )


}