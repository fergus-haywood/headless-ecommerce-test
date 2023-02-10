import Client from 'shopify-buy';
export const endpoint = `${process.env.NEXT_PUBLIC_SHOPIFY_URL}/api/2023-01/graphql.json`
export const headers = {
  "X-Shopify-Storefront-Access-Token": "a325e74a6b5aa0aac3c6aca445b7dff5",
  'Content-Type': "application/json"
}

//initializing the Shopify Client to use the Shopify Buy SDK
export const shopifyClient = async () => { 
  return Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_URL,
    storefrontAccessToken: process.env.NEXT_PUBLIC_TOKEN
})
}
