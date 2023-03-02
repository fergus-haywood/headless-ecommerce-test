import { getVariantByOptions } from "../../data/product"
import  { useRouter } from "next/router"
import React, {useState, useEffect} from "react"


export default function OptionVariantSelector({product, setVariable, variants}:any) { 


const router = useRouter()
const handle = router.query.productHandle
const options = product.options

const firstAvailable = variants.find((variant:any) => variant.node.availableForSale === true)
const initialValue:any = {}

firstAvailable.node.selectedOptions.forEach((option:any) => {
    initialValue[option.name] = option.value 
  }) 

const [ selectedVariants, setSelectedVariants ]:any = useState(initialValue)

async function handleClick(option:any, e:any) { 
 setSelectedVariants((prev:any) => { 
  return { 
    ...prev,
    [option]:  e.target.value
  }
 })
}

useEffect(() => { 
  async function variable() { 
    const seletectedVariableId = await getVariantByOptions(handle, selectedVariants)
    setVariable(variants.find((variant:any) => variant.node.id === seletectedVariableId))
  }
  variable()
}, [selectedVariants])

  return ( 
    <>
<p>option</p>
    {options.map((option:any) => (
      <React.Fragment key={option.name}>
      <p>{option.name}</p>

      {option.values.map((value:any) => ( 
        <React.Fragment key ={ value}>
        <label>
          {value}
          <input type="radio" value={value} name={option.name} onClick={(e) => handleClick(option.name, e)} checked={ selectedVariants[option.name] == value}/>
        </label>
      </React.Fragment>
      ))}
      </React.Fragment> 
    ))}
    </>
    )
}