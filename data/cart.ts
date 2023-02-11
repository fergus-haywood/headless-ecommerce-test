import { endpoint, headers } from "../lib/shopify";
import { gql, request } from 'graphql-request'
import { useContext} from 'react'
import { SiteContext } from "../lib/siteContext";
import { addToShopifyCart, updateShopifyCart } from "./queries";import { getProductByHandle } from "./product";
;




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

  console.log('cart initialized')
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


export async function addToLocalCart(product:any, variant:any, quantity:any ) {

  console.log('product',product)
  console.log('variant', variant)
  console.log('optionTitle', variant)


  
let cart = getCart()
const variantId = variant.node.id
const productTitle = product.title
const variantTitle = variant.node.title
const optionTitle = variant.node.selectedOptions[0].name
const price = variant.node.price.amount
const heroImage = variant.node.image.url
const imageAlt = variant.node.image.altText || ' '

const existingVariant =  cart.lineItems.find((product:any) => product.variantId === variantId)

if(existingVariant) { 

  const index = cart.lineItems.indexOf(existingVariant)

  cart.lineItems.splice(index, 1, {
    ...existingVariant,
    quantity: existingVariant.quantity + quantity
  })
} else {

  
  cart.lineItems.push({
    productTitle,
    variantTitle,
    optionTitle,
    variantId,
    heroImage,
    imageAlt,
    price,
    quantity,
})

}

window.localStorage.setItem('headless-shop-cart', JSON.stringify({
  ...cart
}))
addToShopifyCart(variantId, cart.id, quantity)

  return cart
}


export async function updateLocalCart(variantId: string, quantity: number) { 
  let cart = getCart() 
  const cartVariant = cart.lineItems.find((product: any) => product.variantId === variantId)
  const index =  cart.lineItems.indexOf(cartVariant)

  const updatedVariant = {
    ...cartVariant,
    quantity,
  }

  if (quantity === 0)  {
    cart.lineItems.splice(index, 1)
  } else { 
    cart.lineItems.splice(index, 1, updatedVariant )
  }


  window.localStorage.setItem('headless-shop-cart', JSON.stringify({
    ...cart
  }))

  
  updateShopifyCart(variantId, cart.id, quantity)
  
  console.log('local storage cart updated', cart)
  return cart
}
