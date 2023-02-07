import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { getClient } from "../../lib/sanity";
import { gql, request} from 'graphql-request'
import { useRouter } from 'next/router'
import { getAllProducts, getProductByHandle } from "../../data/product";


export default function ProductPage ({ data }) { 
  const { product }  = data
   
  console.log(product.media.edges[0])


return ( 
  <>
  <h1> 
    {product.title} testing
  </h1>

  <Image src={product.media.edges[0].node.image.url} alt={product.media.edges[0].node.alt} width={200} height={200} />
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