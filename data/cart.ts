import { endpoint, headers } from "../lib/shopify";
import { gql, request } from 'graphql-request'
import { useContext} from 'react'
import { SiteContext } from "../lib/siteContext";
import { addToShopifyCart, updateShopifyCart } from "./queries";import { getProductByHandle } from "./product";
import * as type from '../types/index'
import { Type } from "typescript";

export async function initCart():Promise<type.ContextCart> { 
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
      ...res.cartCreate.cart,
      lineItems: []
  }
}


export async function addToLocalCart(product:type.PageProduct, variant:type.ShopifyVariant, quantity:number ) {

  console.log('product',product)
  console.log('variant', variant)
  console.log('optionTitle', variant)

let cart = getLocalCart()
if (!cart) { 
  return
}

const variantId = variant.node.id
const productTitle = product.title
const variantTitle = variant.node.title
const optionTitle = variant.node.selectedOptions[0].name
const price = variant.node.price.amount
const heroImage = variant.node.image.url
const imageAlt = variant.node.image.altText || ' '

const existingVariant = cart.lineItems.find((product:type.ContextProduct) => product.variantId === variantId)

if(existingVariant) { 
  const index: number = cart.lineItems.indexOf(existingVariant)

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

if (cart.id)  { 
  addToShopifyCart(variantId, cart.id, quantity)
}

  return cart
}


export async function updateLocalCart(variantId: string, quantity: number) { 
  let cart = getLocalCart() 
  if (!cart) return

  const cartVariant = cart.lineItems.find((product: any) => product.variantId === variantId)
  if (!cartVariant) return

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
  
  if (cart.id) { 
    updateShopifyCart(variantId, cart.id, quantity)
  }
  
  console.log('local storage cart updated', cart)
  return cart
}


export function getLocalCart():type.ContextCart | null { 
if (typeof window !== 'undefined') { 
  const localCart = window.localStorage.getItem('headless-shop-cart')
  if (localCart) { 
   return JSON.parse(localCart)
  } else { 
    return null
  }
}
return null
}

