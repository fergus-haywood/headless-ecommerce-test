
import { useCartCount, useCartItems, useSiteContext } from "../../lib/siteContext";
import * as type from '../../types/index'


export default function CartSlider() { 


  const items = useCartItems()
  const count = useCartCount()
  const { isCartOpen } = useSiteContext()


  return ( 

  <div className={`cart-slider-container ${isCartOpen ? 'cart-slider-open' : ''}`} >
    <h1> Cart Slider </h1>
    <p>{count}</p>

    { items.map((item:type.ContextProduct) => { 

<>
      <p>{item.productTitle}</p>
      <p>{item.optionTitle}</p>

</>


    })}


</div>
  )




}