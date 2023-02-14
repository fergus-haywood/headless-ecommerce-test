import { sanityClient } from "../lib/sanity";



export async function getSiteSettings() { 

  const data = await sanityClient.fetch(`*[_type == "settings"]`)
  return data
}

export async function getLayoutSettings() { 

  const query = `*[_type == "settings"][0]{
    menu { 
      links[] {
          _type == 'collectionGroup' => {
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