import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from 'react'
import { SiteContext } from "../../lib/siteContext";
import { getAllProducts, getProductByHandle } from "../../data/product";
import { getCart } from "../../data/cart";
import AddToCartButton from "../../components/AddToCartButton";


export default function ProductPage (props:any) { 

  const { product }  = props.data
  const cart  = getCart()
  const variant = product.variants.edges[0].node.id

return ( 
  <>
  <h1> 
    {product.title} testing
  </h1>
  <Image src={product.media.edges[0].node.image.url} alt={product.media.edges[0].node.alt} width={200} height={200} />
  
<AddToCartButton product={product}/>

  </>
)
}



export async function getStaticPaths() {
const { products } = await getAllProducts()

  const paths = products.edges.map((product:any) => ({
    params: { productHandle: product.node.handle}
   }) )

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context:any) {

const { productHandle = ''} = context.params
const product = await getProductByHandle(productHandle)
  
  return {
    props: {
      data: {
        product,
      },
      revalidate: 10,
    },
  };
}