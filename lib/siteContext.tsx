import react, { createContext, useContext, useState, useEffect, ReactElement } from 'react'
import { initCart } from '../data/cart'
import { addToLocalCart, updateLocalCart, } from '../data/cart'
import { shopifyClient } from './shopify'

const initialContext = {
  cart: {
    id: null,
    checkoutUrl: null,
    lineItems: []
  },
  theme: 'light'
}

export const SiteContext:any | null = createContext({
  context: initialContext,
  setContext: (value:any) => null ,
})


// Getting and Set1=ting Cart to Context

const existingCart = typeof window !== 'undefined' ? 
   JSON.parse(window.localStorage.getItem('headless-shop-cart')) : 
    false



function setCartState(cart:any, setContext:any, context: any) { 

  if (!cart) return null
  setContext((previous:any) => { 
    return { 
      ...previous,
      cart: {
        ...cart
      }
    }
  })

  console.log('new context', context)
}

// Context Wrapper //
// ---------------------------------


export function SiteContextProvider(props:any): ReactElement<{children: React.ReactNode}> {
  
  const { data, children } = props
  
  
  const [ init, setInit ] = useState(false)
  const [context, setContext] = useState({
    ...initialContext
  })

  
  
  
  useEffect(() => { 
    //getInitialCart
      getCart(setContext, existingCart)

    }, [])
    
    
    return (
      <SiteContext.Provider value={{ context, setContext }}>
      {children}
    </SiteContext.Provider>
  )
}




export function useSiteContext() {
  const { context } = useContext(SiteContext)
  return context
}

function useCartCount() {
  const {
    context: { cart },
  } = useContext(SiteContext)

  let count = 0

  if (cart.lineItems) {
    count = cart.lineItems.reduce((total:number, item:any) => item.quantity + total, 0)
  }

  return count
}

function useCartItems() {
  const {
    context: { cart },
  } = useContext(SiteContext)

  return cart.lineItems
}


export async function getCart(setContext: any, existingCart: any) {   
  if (!existingCart) { 
    const newCart = await initCart()

    setContext((prevState:any) => { 
      if (!existingCart) { 
      return { 
        ...prevState,
          ...newCart
       }
      }
    })
  } else { 
    setContext((prevState:any) => { 
      return { 
        ...prevState,
        cart: {
          ...existingCart
        }
       }
      })
 }
}


export function useAddToCart() { 
const { context, setContext } = useContext(SiteContext)

async function addToCart(product:any, variant:any, quantity = 1) { 
  if (!context.cart) return



  const newCart = await addToLocalCart(product, variant, quantity)
  setCartState(newCart, setContext, context)
  console.log(newCart)
}

return addToCart
}


export function useUpdateCart() { 
  const { context, setContext }  = useContext(SiteContext)

  async function updateCart(variantId: string, newQuantity: number) { 
    if (!context.cart) return
    const newCart = await updateLocalCart(variantId, newQuantity) 
    setCartState(newCart, setContext, context)
  }

  console.log(context)

  
  return updateCart
}
