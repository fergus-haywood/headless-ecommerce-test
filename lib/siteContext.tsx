import react, { createContext, useContext, useState, useEffect, ReactElement } from 'react'
import { initCart } from '../data/cart'
import { addToLocalCart } from '../data/cart'

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


// Getting and Setting Cart to Context

const existingCart = typeof window !== 'undefined' ? 
JSON.parse(window.localStorage.getItem('headless-shop-cart')) : 
false


function setCartState(cart:any, setContext:any) { 

  if (!cart) return null

  setContext((previous:any) => { 
    return { 
      ...previous,
      cart: {
        ...cart
      }
    }
  })



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
    if (init === false) { 
      getCart(setContext, existingCart)

      setInit(true)
    }
    }, [init])
    
    
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

async function addToCart(variantId:string, quantity = 1) { 


  if (!context.cart) return

  const newCart = await addToLocalCart(variantId, quantity)

  setCartState(newCart, setContext)

  console.log('added to context cart')
}

return addToCart
}


