import { sanityClient } from "../lib/sanity";
import imageUrlBuilder from "@sanity/image-url"



export async function getSiteSettings() { 

  const data = await sanityClient.fetch(`*[_type == "settings"]`)
  return data
}

export async function getLayoutSettings() { 

  const query = `*[_type == "settings"][0]{
    menu { 
      links[] {
          _type == 'collectionGroup' => {
            title,
            collectionLinks[]-> {
              'title': store.title,
              'slug': store.slug.current,
              'isDeleted': store.isDeleted,
          }
        },
        _type == 'linkInternal' => { 
            'title':title,
            'slug': reference->slug.current,
            },
        _type == 'linkExternal' => { 
              title,
              url,
                }
            }
          },
  footer 
        }`
          
  const data = await sanityClient.fetch(query)
  return data
}


export function urlFor(source:any) {
  return imgBuilder.image(source)
}

const imgBuilder = imageUrlBuilder(sanityClient)