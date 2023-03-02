
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
<br/>
      <button onClick={() => addToCart(product, variant)} disabled={!variant.node.availableForSale}>
{ available ? 
    adding ? 'Adding...' : 'Add to Cart'
    :
    'Sold Out'
}    
</button> 

    
</>
    
    
    
  )


}