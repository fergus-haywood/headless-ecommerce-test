
import { getLayoutSettings } from "../../data/sanity"
import Header from "./Header"



const data = await getLayoutSettings()
export default function Layout({ children }:any) { 


  console.log(data)


return ( 
  <>
  <Header menu={data.menu} />
  <main>{children}</main>
  </>
)  
}


