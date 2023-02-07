import { getAllCollections, getCollectionByHandle } from "../../data/collections"
import Image from "next/image"

export default function Collection(props:any) { 

const collection = props.data.collection

const collectionProducts = collection.products.edges

console.log(collectionProducts[0].node.images.edges[0].node)

  return (
    <>
    <h1>Collection Title</h1>
    <h1>{collection.title}</h1>
    {collectionProducts.map((product: any) => ( 
      <>
      <h2 key={product.node.title}>{product.node.title}</h2>
      <Image src={product.node.images.edges[0].node.url} alt={product.node.images.edges[0].node.altText} width={product.node.images.edges[0].node.width} height={product.node.images.edges[0].node.height} />
    </>

    ))}
    </>
  )
}

export async function getStaticPaths() {
  const collections = await getAllCollections()
  
    const paths = collections.edges.map((collection:any) => ({
      params: { collectionHandle: collection.node.handle}
     }) )
  
    return {
      paths,
      fallback: false,
    }
  }

  
  export async function getStaticProps(context:any) {

    const { collectionHandle = ''} = context.params
    
    const collection = await getCollectionByHandle(collectionHandle)
    
    
    
      
      return {
        props: {
          data: {
            collection,
          },
          revalidate: 10,
        },
      };
    }