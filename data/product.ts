import { groq } from "next-sanity";
import { getClient } from "../lib/sanity";
import { gql, request, GraphQLClient} from 'graphql-request'
import {endpoint, headers } from '../lib/shopify'

export async function getAllProducts() { 
  const variables = {}

const query = gql`{
   products(first: 250) {
    edges {
      cursor
      node {
        id
        title
        description
        handle
        }
      }
    }
}
`
const res = await request(endpoint, query, variables , headers)

return res
}


export async function getProductByHandle(productHandle:string) { 

  const variables = { 
    handle: productHandle
  }

  const query = gql`
    query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      media(first: 10) {
        edges {
          node {
            mediaContentType
            alt
            ...mediaFieldsByType
          }
        }
      }
      options{
        name
        values
      }
      variants(first: 10) {
        edges {
          cursor
          node {
            availableForSale
            id
            title
            selectedOptions{
						name	
            value
            }
            image {
							altText
            	url
            }
            quantityAvailable
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
  
  fragment mediaFieldsByType on Media {
  ...on ExternalVideo {
    id
    host
    originUrl
  }
  ...on MediaImage {
    image {
      url
    }
  }
  ...on Model3d {
    sources {
      url
      mimeType
      format
      filesize
    }
  }
  ...on Video {
    sources {
      url
      mimeType
      format
      height
      width
    }
  }
}
  `

const res = await request(endpoint, query, variables, headers)
return res.product
}

//@ts-ignore
export async function getVariantByOptions(handle, options) { 
  
const optionArr = Object.entries(options)
const selectedOptions = optionArr.map((option:any) => { 
    return {
      name: option[0], 
      value: option[1]
    }
  })

const variables:any = {
  handle,
  selectedOptions,
}

const query = gql`
   query getProductBySelectedOptions($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
      }
    }
  }`

const res = await request(endpoint, query, variables , headers)
return res.product.variantBySelectedOptions.id



}


