
import { getLayoutSettings } from "../../data/sanity"
import CartSlider  from '../ cart/CartSlider'
import Header from "./Header"



const data = await getLayoutSettings()
export default function Layout({ children }:any) { 


  console.log(data)


return ( 
  <>
  <Header menu={data.menu} />
  <CartSlider /> 
  <main>{children}</main>
  </>
)  
}


