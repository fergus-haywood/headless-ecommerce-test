import Image from 'next/image'
import styles from '../styles/components/ProductCard.module.css'
import {useState, useEffect} from 'react'


export default function ProductCard(props:any) { 



  const product = props.product

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer} >
        <Image className={styles.productImage} src={product.node.images.edges[0].node.url} alt={product.node.images.edges[0].node.altText} width={200} height={300} /> 
        <Image className={styles.productImage} src={product.node.images.edges[1].node.url} alt={product.node.images.edges[1].node.altText} width={200} height={300} />
      </div>

      <div className={styles.information} >
      <h4 className={styles.productTitle}>{product.node.title}</h4>
      </div>




    </div>
  )

}