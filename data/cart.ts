import { endpoint, headers } from "../lib/shopify";
import { gql, request } from 'graphql-request'

export async function initCart() { 

  const variables = {}

  const query = gql`
    mutation CreateCart {
    cartCreate {
      cart {
        id
      }
    }
  }`;

const res = await request(endpoint, query, variables , headers)
  window.localStorage.setItem('headless-shop-cart', JSON.stringify(res.cartCreate))
return res.cartCreate.cart
}


export async function addProductToCart(product: any) { 

}