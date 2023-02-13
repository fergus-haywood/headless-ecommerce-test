import { createContext, useContext, useState, useEffect, ReactElement } from 'react'
import { initCart } from '../data/cart'
import { addToLocalCart, updateLocalCart, getLocalCart } from '../data/cart'
import * as type from '../types/index'

const initialContext:type.Context  = {
  isCartOpen: false,
  isAdding: false,
  theme: 'light',
  cart: {
    id: null,
    checkoutUrl: null,
    lineItems: []
  }
}

export const SiteContext:any | null = createContext({
  context: initialContext,
  setContext: () => null ,
})


// Getting and Setting Cart to Context

const existingCart = getLocalCart()

function setCartState(cart:type.ContextCart, setContext:React.Dispatch<React.SetStateAction<type.Context>>, cartOpen?: boolean) { 

  if (!cart) return null
  setContext((previous:any) => { 
    return { 
      ...previous,
      isAdding: false,
      isCartOpen: cartOpen ? true : previous.isCartOpen,
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
  const [context, setContext] = useState<type.Context>({
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

export function useCartCount() {
  const {
    context: { cart },
  } = useContext(SiteContext)

  let count = 0

  if (cart.lineItems) {
    count = cart.lineItems.reduce((total:number, item:any) => item.quantity + total, 0)
  }

  return count
}

export function useCartItems() {
  const {
    context: { cart },
  } = useContext(SiteContext)

  return cart.lineItems
}


export async function getCart(setContext: any, existingCart: type.ContextCart | null) {   
  if (!existingCart) { 
    const newCart = await initCart()
    setContext((prevState:type.Context) => { 
      if (!existingCart) { 
      return { 
        ...prevState,
        cart: {
          ...newCart
        }
       }
      }
    })
  } else { 
    setContext((prevState:type.Context) => { 
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

async function addToCart(product:type.PageProduct, variant:type.ShopifyVariant, quantity = 1) { 
  setContext((prevState:type.Context) => { 
    return  { 
      ...prevState,
      isAdding: true,
    }
  })

  if (!context.cart) return
  const newCart = await addToLocalCart(product, variant, quantity).catch(err => err.message)
    setCartState(newCart, setContext, true)
    setTimeout(() => setContext((prevState:type.Context) => { 
      return { 
        ...prevState,
        isCartOpen: false
      }
    }), 3000)

}


return addToCart
}


export function useUpdateCart() { 
  // @ts-ignore
  const { context, setContext }  = useContext(SiteContext)

  async function updateCart(variantId: string, newQuantity: number) { 
    if (!context.cart) return
    const newCart = await updateLocalCart(variantId, newQuantity) 

    if (newCart) { 
      setCartState(newCart, setContext)
    }
  }

  return updateCart
}

export function useToggleCart() {
  const {
    context: { isCartOpen },
    setContext,
  } = useContext(SiteContext)

  async function toggleCart() {
    setContext((prevState:type.Context) => {
      return { ...prevState, isCartOpen: !isCartOpen }
    })
  }
  return toggleCart
}
