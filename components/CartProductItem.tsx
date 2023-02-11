import { getProductByHandle } from "../data/product"
import Image from "next/image"
import { useUpdateCart } from "../lib/siteContext"
import QuantityToggle from './ cart/QuantityToggle'


export default function CartProductItem({ product }:any) { 
  
  const updateCart = useUpdateCart()


  return ( 
    <>
    <p>{product.productTitle}</p>
    <p>{product.price}</p>
    <p>{product.optionTitle}:</p>
    <p>{product.variantTitle}</p>
    <Image src={product.heroImage} alt={product.imageAlt || 'blank'} width={200} height={300} />
    <br />
    <QuantityToggle product={product} />
    <br />

<button onClick={() => updateCart(product.variantId, 0)}>
remove from Cart
</button>
    </>
  )
}