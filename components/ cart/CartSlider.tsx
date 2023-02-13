
import { useCartCount, useCartItems, useSiteContext } from "../../lib/siteContext";
import * as type from '../../types/index'
import CartProductItem from './CartProductItem'


export default function CartSlider() { 


  const items = useCartItems()
  const count = useCartCount()
  const { isCartOpen } = useSiteContext()


  return ( 

  <div className={`cart-slider-container ${isCartOpen ? 'cart-slider-open' : ''}`} >
    <h1> Cart Slider </h1>
    <p>{count}</p>

    { items.map((product:type.ContextProduct) => (

      
      <CartProductItem key={product.variantId} product={product} />
      
      
      )
    )}


</div>
  )




}