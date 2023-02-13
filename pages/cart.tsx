
import { useSiteContext, SiteContext, useUpdateCart, useCartCount} from '../lib/siteContext'
import CartProductItem from '../components/CartProductItem'
import Link from 'next/link'



export default function Cart() { 

  const { cart } = useSiteContext()
  const { checkoutUrl } = cart
  const itemCount = useCartCount()




  return ( 
    <>

    <h1>  cart </h1>

    <p>Cart Count: {itemCount}</p>

      {cart.lineItems.map((product:any) => (

        <CartProductItem key={product.variantId} product={product} />
        )
      )}
      <br />
        {checkoutUrl && 
      <Link href={checkoutUrl}>
        Checkout
      </Link>
        }

    </>
  )


}