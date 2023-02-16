import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react'
import { getAllProducts, getProductByHandle } from "../../data/product";
import AddToCartButton from "../../components/product/AddToCartButton";
import VariantSelector from "../../components/product/VariantSelector"
import OptionVariantSelector from "../../components/product/OptionVariantSelector";
import useSWR  from 'swr'
import axios from "axios";

// setup inventory fetcher

export default function ProductPage (props:any) { 
  const { product }  = props.data


  const fetcher = (url:string, id:string) =>
  axios.get(url, { params: {
    id: product.handle} }).then((res) => res.data)

  
  const { data, error } = useSWR('/api/productAvailability', fetcher, {errorRetryCount: 3});
  const variants = product.variants.edges
  const hasVariants = variants.length > 1
  const options = product.options
  const hasMultipleOptions = options.length > 1
  const [ selectedVariant, setSelectedVariant ] = useState(getAvailableVariant())
  const [ available, setAvailable ] = useState(true)

  
  function getAvailableVariant() { 
    return variants.find((variant:any) => variant?.node?.availableForSale === true)
  }

  useEffect(() => { 
    if (data) { 
      const checkAvailable = data?.product?.variants?.edges.find((item:any) => item.node.id === selectedVariant.node.id) 
      if ( checkAvailable?.node.availableForSale) { 
        setAvailable(true)
      } else { 
        setAvailable(false)
      }
    }
  },[data, selectedVariant])





return ( 
  <>
  <h1> 
    {product.title} testing
  </h1>

  <p>testing the api call {available}</p>
  <Image src={product.media.edges[0].node.image.url} alt={product.media.edges[0].node.alt} width={200} height={200} />

   {(hasVariants && !hasMultipleOptions) &&
      <VariantSelector key={options[0].name} variants={variants} initVariable={selectedVariant} setVariant={setSelectedVariant} option={options[0].name} />

} 
      {(hasMultipleOptions) &&
        <OptionVariantSelector product={product} setVariable={setSelectedVariant} variants={variants}/>
      

}
  

    <AddToCartButton product={product} variant={selectedVariant} available={available}/>
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