
import { useEffect , useState} from "react"
import { useSiteContext, useAddToCart } from "../../lib/siteContext"




export default function AddToCartButton({ product, variant, available }:any) { 

  const { isAdding} = useSiteContext()


  const addToCart = useAddToCart()

  const [ adding, setAdding ] = useState(isAdding)


  useEffect(() => { 


    setAdding(isAdding)

  }, [isAdding])





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