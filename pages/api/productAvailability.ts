import { headers, endpoint } from "../../lib/shopify"
import{ gql, request } from 'graphql-request'


export default async function avaible(req:any, res:any) {
  const {
    query: { id },
  } = req


  async function getProduct(handle:string) {
    const variables  = { 
      handle, 
    }


    const query = `
    {
      product(handle: "${handle}") {
        id
        variants(first: 25) {
          edges {
            node {
              id
              availableForSale
            }
          }
        }
      }
    }`

    const response = await request(endpoint, query, variables , headers)

    const product = response

    return product
  }

  const product = await getProduct(id)
  res.json(product)
}
