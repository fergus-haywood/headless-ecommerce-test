
import { useContext, useEffect , useState} from "react"
import { SiteContext, useAddToCart } from "../lib/siteContext"




export default function AddToCartButton({ product, variant, available }:any) { 

  const { context, setContext } = useContext(SiteContext)
  const addToCart = useAddToCart()

  const [ adding, setAdding ] = useState(context.isAdding)


  useEffect(() => { 

    setAdding(context.isAdding)

  }, [context])





  return ( 

<>

{ available ? 
      <button onClick={() => addToCart(product, variant)} >
    {adding ? 'Adding...' : 'Add to Cart'}
    
</button> 
:

      <button> 
      Sold Out
      </button>
}
    
</>
    
    
    
  )


}