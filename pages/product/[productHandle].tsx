import Image from "next/image";
import Link from "next/link";
import { useState, useContext, useEffect } from 'react'
import { SiteContext } from "../../lib/siteContext";
import { getAllProducts, getProductByHandle } from "../../data/product";
import { getCart } from "../../data/cart";
import AddToCartButton from "../../components/AddToCartButton";
import VariantSelector from "../../components/product/VariantSelector"
import useSWR  from 'swr'
import axios from "axios";

// setup inventory fetcher

export default function ProductPage (props:any) { 
  const { product }  = props.data


  const fetcher = (url:string, id:string) =>
  axios.get(url, { params: {
    id: product.handle} }).then((res) => res.data)

  
    const { data, error } = useSWR('/api/productAvailability', fetcher, {errorRetryCount: 3});

  const cart  = getCart()
  const variants = product.variants.edges

  const hasVariants = variants.length > 1
  const options = product.options

  const [ selectedVariant, setSelectedVariant ] = useState(variants[0])

  const [ available, setAvailable ] = useState(true)


  useEffect(() => { 

    if (data) { 
      const checkAvailable = data?.product?.variants?.edges.find((item:any) => item.node.id === selectedVariant.node.id) 

      if ( checkAvailable.node.availableForSale) { 
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

  {/* <p>testing the api call {productInventory}</p> */}
  <Image src={product.media.edges[0].node.image.url} alt={product.media.edges[0].node.alt} width={200} height={200} />

  { hasVariants && (
    options.map((option:any) => (
      <VariantSelector key={option.name} variants={variants} setVariant={setSelectedVariant} option={option.name} />
    ))
  )}

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