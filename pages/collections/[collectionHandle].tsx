import { getAllCollections, getCollectionByHandle } from "../../data/collections"

export default function Collection(props:any) { 

const collection = props.data.collection

const collectionProducts = collection.products.edges

  return (
    <>
    <h1>Collection Title</h1>
    <h1>{collection.title}</h1>
    {collectionProducts.map((product: any) => ( 

      <h2 key={product.node.title}>{product.node.title}.</h2>

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