import { endpoint, headers } from "../lib/shopify";
import { gql, request } from "graphql-request";


export async function getAllCollections() { 

  const variables = {}

  const query = gql`
  query getAllCollections
  {
    collections(first: 50) {
      edges {
        node {
      id
      title
      handle
        }
      }
    }
  }`;

const res = await request(endpoint, query, variables , headers)
return res.collections

}

export async function getCollectionByHandle(collectionHandle:string) { 

  const query = gql`
  query getProductsInCollection($handle: String!) {
	collection(handle: $handle) {
		id
		title
		products(first: 50, sortKey: BEST_SELLING) {
			edges {
				node {
					id
					title
					vendor
					availableForSale
          totalInventory
          handle
					images(first: 2) {
						edges {
							node {
								id
								url
								width
								height
								altText
							}
						}
					}
					priceRange { # Returns range of prices for a product in the shop's currency.
						minVariantPrice {
							amount
							currencyCode
						}
						maxVariantPrice {
							amount
							currencyCode
						}
					}
				}
			}
		}
	}
}`

const variables = { 
  handle: collectionHandle
}
const res = await request(endpoint, query, variables , headers)
return res.collection

  
}