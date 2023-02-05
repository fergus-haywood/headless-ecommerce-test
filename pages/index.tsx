
import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { getClient } from "../lib/sanity";
import { gql, GraphQLClient, request} from 'graphql-request'
import test from "node:test";

const homepageQuery = groq`*[_type == "homepage"]{
  heroTitle
}[0]`; 





function HomePage(props:any) {
  const { homepageData } = props.data;
  const { collection } = props.data

  
  const products = collection.products.edges


  return (
    <main className="bg-gray-50">
      <div className="h-96 bg-indigo-500 flex justify-center items-center">
        <h1 className="text-white font-semibold text-6xl">
          {homepageData?.heroTitle}
        </h1>
      </div>

      <section className="container mx-auto py-12">
        <h2 className="font-semibold text-4xl mb-8">Featured Products</h2>

        <div className="grid grid-flow-row grid-cols-3 grid-rows-auto gap-8">

{products.map((product: any) => ( 

          <article key={product.node.title} className="text-center bg-white rounded-xl p-8 shadow-md pt-6 md:p-8 space-y-8">
            <Image
              src={product.node.images.edges[0].node.transformedSrc}
              width="150"
              height="150"
              alt="A pair of slippers"
              className="rounded-full"
            />

            <p className="text-lg font-semibold">{product.node.title}</p>

            <div className="font-medium">
              <Link href="/" className="bg-gray-100 text-gray-800 px-6 py-2 rounded block">
                  View Product
              </Link>
            </div>
          </article>
))}

        </div>
      </section>
    </main>
  );
}

export default HomePage;

export async function getStaticProps() {
  const homepageData = await getClient().fetch(homepageQuery, {});

    // Shopify Request
    const query = gql`
    {
      collectionByHandle(handle: "homepage") {
        id
        title
        products(first: 12) {
          edges {
            node {
              id
              title
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
              images(first: 1) {
                edges {
                  node {
                    altText
                    transformedSrc
                  }
                }
              }
            }
          }
        }
      }
    }`;

    const endpoint = `${process.env.NEXT_PUBLIC_SHOPIFY_URL}/api/2023-01/graphql.json`
    const headers = {
          "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_TOKEN,
        }
        const variables = { 
          data: {
           products: {
            edges: [
              {
                node: {
                  handle: "testing-1"
                }}]
              }
            }
          }

const res = await request(endpoint, query, variables , headers)

  // const res = await graphQLClient.request(query);

  if (res.errors) {
    console.log(JSON.stringify(res.errors, null, 2));
    throw Error("Unable to retrieve Shopify Products. Please check logs");
  }


  
  return {
    props: {
      data: {
        homepageData,
        collection: res.collectionByHandle,
      },
      revalidate: 10,
    },
  };
}