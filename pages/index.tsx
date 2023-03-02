
import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { getClient } from "../lib/sanity";
import { getCollectionByHandle } from "../data/collections";
import ProductCard from "../components/product/ProductCard";
import CartSlider from "../components/ cart/CartSlider";
import { useRouter } from "next/router";
import { urlFor } from "../data/sanity";




export default function HomePage(props: any) {

  const { homepageData, collection } = props.data;

  
  const products = collection.products.edges

  return (
    <>
    <main className="bg-gray-50">
      <div className="h-96 bg-indigo-500 flex justify-center items-center">
        <h1 className="text-white font-semibold text-6xl">
          {homepageData?.title}
        </h1>
      </div>
      {homepageData.hero && 
      <section className = "homepage-hero">
      {homepageData.hero.content.map((content:any) => (
        <div key={content._key} className='hero-image-container'>
        <Image fill src={urlFor(content.image).quality(100).url()} alt="homepage-image" />
        </div>
      ))}
      </section>
      }
      <section className="container mx-auto py-12">
        <h2 className="font-semibold text-4xl mb-8">Featured Products</h2>

        <div className="grid grid-flow-row grid-cols-3 grid-rows-auto gap-8">

           {products.map((product: any) => ( 
             <ProductCard key={product.node.title} product={product} />
             ))}

        </div>
      </section>
    </main>
      <CartSlider />
    </>
  );
}


export async function getStaticProps() {

  const homepageQuery = groq`*[_type == 'page' && slug.current =='homepage'][0]`; 
  const homepageData = await getClient().fetch(homepageQuery, {});

    // Shopify Request

  const res = await getCollectionByHandle('homepage')



  return {
    props: {
      data: {
        homepageData,
        collection: res,
      },
      revalidate: 10,
    },
  };
}

