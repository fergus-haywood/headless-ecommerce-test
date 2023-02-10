
import { useUpdateCart } from "../../lib/siteContext"

import { useState, useEffect } from 'react'



export default function ProductToggle({product}:any) { 

  const updateCart = useUpdateCart()

  
  const [quantity, setQuantity ] = useState(product.quantity)

  useEffect(() => {

    updateCart(product.variantId, quantity)
  }, [quantity])


  
  return ( 

    <>
    <button type="button" onClick={() => setQuantity(quantity + 1)} >Up</button>
    <input required disabled type='text' pattern="[0-9]*" min="1" value={quantity} />
    <button type="button" onClick={() => setQuantity(quantity - 1)} >Down</button>
    </>

  )

}