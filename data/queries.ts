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


const res = await request(endpoint, query, variables , headers).then((res) => { return res })

console.log('product added to shopify cart')
return res
}

export async function updateShopifyCart(variantId: string, cartId: string, quantity: number) { 
  const lineItemId = await getLineItemId(cartId, variantId)
  let res

  if (quantity === 0) {
    const variables = { 
      cartId,
      lineIds: lineItemId
    }

    const query = gql`
    mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      id
        lines(first: 10){
            edges
            {
                node{
                    quantity
                    merchandise{
                        ... on ProductVariant {   
                            id
                        }
                    }
                }
            }
        }
    }
}
  }
    `

res = await request(endpoint, query, variables, headers)

} else { 
  const variables = { 
    cartId,
    lines: { 
      id: lineItemId,
      quantity,
    }
  }
  
  const query = gql`
  mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
    }
  }
}
  `
 res = await request(endpoint, query, variables, headers)
 }
}






export async function getLineItemId(cartId: string, variantId: string) { 


  const variables = { 
    cartId
  }

  const query = gql`
  query cartQuery($cartId: ID!) {
  cart(id: $cartId) {
    id
    lines(first: 10) {
      edges {
        node {
          id
          merchandise {
            ... on ProductVariant {
              id
            }
          }
        }
      }
    }
  }
}`


const shopifyCart = await request(endpoint, query, variables , headers)


const productLineItemId = shopifyCart.cart.lines.edges.find((item:any) => item.node.merchandise.id === variantId).node.id


return productLineItemId
}