import React, { useEffect, useState } from "react"


export default function VariantSelector({variants, setVariant, option}:any) { 


  const [ selectedVariant, setSelectedVariant ] = useState(variants[0].node.id)

  function handleClick(e:any) { 

    setSelectedVariant(e.target.value)

    setVariant(variants.find((variant:any) => variant.node.id === selectedVariant))
  }



  useEffect(() => {
    setVariant(variants.find((variant:any) => variant.node.id === selectedVariant))
  }, [selectedVariant])

return ( 
  <>
<p>Variant Selector</p>
<form>
  <legend>{option}</legend>
{variants.map((variant: any) => ( 
  <React.Fragment key ={ variant.node.id}>
  <label key={variant.node.id}>{variant.node.title}
  <input key={variant.node.id} type="radio" value={variant.node.id} name={option} onClick={(e) => handleClick(e)}/>
  </label>

  </React.Fragment>
  ))}
  </form>

  </>
 )
}