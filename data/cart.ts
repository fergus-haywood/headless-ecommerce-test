import { endpoint, headers } from "../lib/shopify";
import { gql, request } from 'graphql-request'
import {  useGetCart } from '../lib/siteContext'
import { json } from "stream/consumers";

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
  window.localStorage.setItem('headless-shop-cart', JSON.stringify(res.cartCreate))
return res.cartCreate.cart
}


export function getCart() { 

  if (typeof window !== "undefined") { 
    
    const cart:any = window.localStorage.getItem('headless-shop-cart')


    const jsonCart =  JSON.parse(cart)
console.log('getCart', jsonCart.cart)
return jsonCart.cart

  }
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

