import React, { useEffect, useState } from "react"
import { getVariantByOptions } from "../../data/product"
import { useRouter } from "next/router"


export default function VariantSelector({variants, initVariable ,setVariant, option}:any) { 

  const [ selectedVariant, setSelectedVariant ] = useState(initVariable.node.id)
  
  function handleClick(e:any) { 
    setSelectedVariant(e.target.value)
    setVariant(variants.find((variant:any) => variant.node.id === selectedVariant))
  }
  useEffect(() => {
    setVariant(variants.find((variant:any) => variant.node.id === selectedVariant))
  }, [selectedVariant])


console.log(variants[0])

return ( 
  <>
<p>Variant Selector</p>
<form>
  <legend>{option}</legend>
{variants.map((variant: any) => ( 
  <React.Fragment key ={ variant.node.id}>
  <label key={variant.node.id} className={`${!variant.node.availableForSale? 'sold-out' : ''}`}>
    {variant.node.title} 
  <input key={variant.node.id} type="radio" value={variant.node.id} name={option} onClick={(e) => handleClick(e)} checked={variant.node.id === selectedVariant} />
  </label>

  </React.Fragment>
  ))}
  </form>

  </>
 )
}