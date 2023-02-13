import Image from 'next/image'
import styles from '../styles/components/ProductCard.module.css'
import Link from 'next/link'


export default function ProductCard(props:any) { 

  const product = props.product

  return (
    <div className={styles.container}>
        <Link href={`/product/${product.node.handle}`} >
      <div className={styles.imageContainer} >
        <Image className={styles.productImage} src={product.node.images.edges[0].node.url} alt={product.node.images.edges[0].node.altText ? product.node.images.edges[0].node.altText : "alt-text" } width={200} height={300} /> 
        <Image className={styles.productImage} src={product.node.images.edges[1].node.url} alt={product.node.images.edges[1].node.altText ? product.node.images.edges[1].node.altText : 'alt-text'} width={200} height={300} />
      </div>
        </Link>

      <div className={styles.information} >
      <h4 className={styles.productTitle}>{product.node.title}</h4>
      </div>
    </div>
  )

}

