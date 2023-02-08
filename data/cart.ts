import { endpoint, headers } from "../lib/shopify";
import { gql, request } from 'graphql-request'
import { useContext} from 'react'
import { SiteContext } from "../lib/siteContext";




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

  console.log('cart initialized and set in local storage')

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
    return jsonCart.cart

  }
}

export function useAddToCart(variant:any, cart:any, quantity = 1) { 

  const { context, setContext } = useContext(SiteContext)


}


export async function addItemToCart(variantId: string, cartId:string,  quantity = 1) {

   const variables = {
    variantId,
    quantity,
    cartId,
   }


   const query = gql`
    mutation AddToCart($cartId: ID!, $variantId: ID!) {
        cartLinesAdd(cartId: $cartId, lines: [{ quantity: 1, merchandiseId: $variantId}]) {
          cart {
            checkoutUrl
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`



const res = await request(endpoint, query, variables , headers)
console.log('added to cart', res)

}

