import { endpoint, headers } from "../lib/shopify";
import { gql, request } from 'graphql-request'
import { useContext} from 'react'
import { SiteContext } from "../lib/siteContext";
import { addToShopifyCart } from "./queries";;




export async function initCart() { 
  const variables = {}
  const query = gql`
    mutation CreateCart {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }`;

const res = await request(endpoint, query, variables , headers)
  window.localStorage.setItem('headless-shop-cart', JSON.stringify({
    ...res.cartCreate.cart, 
    lineItems: []
  }))

  return { 
    cart: { 
      ...res.cartCreate.cart,
      lineItems: []
    }
  }
}


export function getCart() { 

  if (typeof window !== "undefined") { 
    
    const cart:any = window.localStorage.getItem('headless-shop-cart')


    const jsonCart =  JSON.parse(cart)
    return jsonCart

  }
}




export async function addToLocalCart(variantId: string,  quantity:number) {

let cart = getCart()

cart.lineItems.push({
  variantId,
  quantity,
})

  window.localStorage.setItem('headless-shop-cart', JSON.stringify({
    ...cart
  }))

  console.log('added to local storage')

  addToShopifyCart(variantId, cart.id, quantity)


  return cart

}

