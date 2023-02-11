import Image from "next/image";
import Link from "next/link";
import { useState, useContext, useEffect } from 'react'
import { SiteContext } from "../../lib/siteContext";
import { getAllProducts, getProductByHandle } from "../../data/product";
import { getCart } from "../../data/cart";
import AddToCartButton from "../../components/AddToCartButton";
import VariantSelector from "../../components/product/VariantSelector";


export default function ProductPage (props:any) { 

  const { product }  = props.data
  const cart  = getCart()
  const variants = product.variants.edges

  const hasVariants = variants.length > 1
  const options = product.options

  const [ selectedVariant, setSelectedVariant ] = useState(variants[0])



return ( 
  <>
  <h1> 
    {product.title} testing
  </h1>
  <Image src={product.media.edges[0].node.image.url} alt={product.media.edges[0].node.alt} width={200} height={200} />

  { hasVariants && (

    options.map((option:any) => (

      <VariantSelector key={option.name} variants={variants} setVariant={setSelectedVariant} option={option.name} />

    ))





  )}

    <AddToCartButton product={product} variant={selectedVariant} />





    < br/>



    <Link href='/cart'>
      Go to Cart
      </Link>
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