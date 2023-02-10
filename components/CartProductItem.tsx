import { getProductByHandle } from "../data/product"
import Image from "next/image"
import { useUpdateCart } from "../lib/siteContext"


export default function CartProductItem({ product }:any) { 
  
  const updateCart = useUpdateCart()





  return ( 
    <>
    <p>{product.productTitle}</p>
    <p>{product.price}</p>
    <p>{product.quantity}</p>
    <Image src={product.heroImage.image.url} alt={product.heroImage.alt || 'blank'} width={200} height={300} />

<button onClick={() => updateCart(product.variantId, 69)}>
Update Cart
</button>

<button onClick={() => updateCart(product.variantId, 0)}>
remove from Cart
</button>
    </>
  )
}