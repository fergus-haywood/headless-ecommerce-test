import { SingletonRouter } from "next/router"
import React from "react"
import { StringLiteralLike } from "typescript"

export interface Context { 
  theme: string,
  isAdding: boolean,
  isCartOpen: boolean,
  cart: ContextCart,


}

export interface ContextCart { 
    id: string | null,
    checkoutUrl: string | null,
    lineItems: ContextProduct[]

}
export interface ContextProduct { 
  heroImage: string,
  imageAlt: string,
  optionTitle: string,
  price: string,
  productTitle: string,
  quantity: number,
  variantId: string,
  variantTitle: string
}

export interface PageProduct { 
  description: string,
  handle: string,
  id: string,
  media: {
    edges: PageProductMedia[],
}
options: PageProductOptions[],
title: string,
variants: ShopifyVariant[]
}

export interface PageProductOptions { 
  name: string
}


export interface PageProductMedia { 
  alt: string,
  image: { 
    url: string,
  },
  mediaContentType: string
}


export interface ShopifyVariant { 
  cursor: string,
  node: { 
    id: string,
    title:string
    image: { 
      altText: string,
      url: string,
    }
    price: { 
      amount: string,
      currencyCode: string
    }
    quantityAvailable: number,
    selectedOptions: ShopifyOption[],
  }
}


export interface ShopifyOption { 
  name: string
}

export interface SiteContext { 
  context: Context,
  setContext: React.Dispatch<React.SetStateAction<Context | null >>
}