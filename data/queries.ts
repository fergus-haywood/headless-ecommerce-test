import  { gql, request} from 'graphql-request'
import { endpoint, headers } from "../lib/shopify";



export async function addToShopifyCart(variantId: string, cartId: string, quantity = 1) { 

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
}