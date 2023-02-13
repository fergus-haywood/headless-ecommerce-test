import { createContext, useContext, useState, useEffect, ReactElement } from 'react'
import { initCart } from '../data/cart'
import { addToLocalCart, updateLocalCart, getLocalCart } from '../data/cart'
import * as type from '../types/index'

const initialContext:type.Context  = {
  cart: {
    id: null,
    checkoutUrl: null,
    isAdding: false,
    isCartOpen: false,
    lineItems: []
  },
  theme: 'light'
}

export const SiteContext:any | null = createContext({
  context: initialContext,
  setContext: (context:type.Context) => null ,
})


// Getting and Setting Cart to Context

const existingCart = getLocalCart()

function setCartState(cart:type.ContextCart, setContext:React.Dispatch<React.SetStateAction<type.Context | null>>, context: type.Context) { 

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

// function useCartCount() {
//   const {
//     context: { cart },
//   } = useContext(SiteContext)

//   let count = 0

//   if (cart.lineItems) {
//     count = cart.lineItems.reduce((total:number, item:any) => item.quantity + total, 0)
//   }

//   return count
// }

// function useCartItems() {
//   const {
//     context: { cart },
//   } = useContext(SiteContext)

//   return cart.lineItems
// }


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
  // @ts-ignore
const { context, setContext } = useContext(SiteContext)

async function addToCart(product:type.PageProduct, variant:type.ShopifyVariant, quantity = 1) { 

  if (!context.cart) return
  const newCart = await addToLocalCart(product, variant, quantity)

  if (newCart) { 
    setCartState(newCart, setContext, context)
  }
  console.log(newCart)
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
      setCartState(newCart, setContext, context)
    }
  }

  console.log(context)

  
  return updateCart
}
