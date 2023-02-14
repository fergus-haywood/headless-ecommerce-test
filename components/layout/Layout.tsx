import { AppProps } from "next/app"
import { getLayoutSettings } from "../../data/sanity"



const data = await getLayoutSettings()
export default function Layout({ children }:any) { 


  console.log(data)


return ( 
  <>
  <h1>This is the Layout</h1>
  <main>{children}</main>
  </>
)  
}


