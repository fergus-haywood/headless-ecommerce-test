import react, { createContext, useContext, useState, useEffect, ReactElement } from 'react'
import { initCart } from '../data/cart'

const initialContext = {
  cart: {
    id: null,
    lineItems: []
  },
  theme: 'light'
}

const SiteContext = createContext({
  context: initialContext,
  setContext: () => null,
})

// Getting and Setting Cart to Context

const existingCart = typeof window !== 'undefined' ? 
JSON.parse(window.localStorage.getItem('headless-shop-cart')) : 
false



// Context Wrapper //

export function SiteContextProvider(props:any): ReactElement<{children: React.ReactNode}> {

  const { data, children } = props


  const [context, setContext] = useState({
    ...initialContext
  })

  useEffect(() => { 
    //getInitialCart
    getInitialCart(setContext, existingCart)
    
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

async function getInitialCart(setContext: any, existingCart: any) { 

  if (!existingCart) { 
    const newCart = await initCart()
    setContext((prevState:any) => { 
      return { 
        ...prevState,
       cart: { 
        id: newCart.id,
        lineItems: []
       }
      }
    })
  } else { 
      setContext((prevState:any) => { 

        return { 
          ...prevState,
          cart: { 
            id: existingCart.cart.id,
            lineItems: existingCart.cart.lineItems? existingCart.cart.lineItems : []
          }
        }}
      )
  }

}
