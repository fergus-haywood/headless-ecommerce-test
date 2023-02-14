import styles from '../../styles/components/Layout/Header.module.css'

import Navigation from "./Navigation"
import { useCartCount } from "../../lib/siteContext"
import Link from 'next/link'


export default function Header({ menu }:any) { 

  const cartCount = useCartCount()



  return ( 

    <div className={styles.container}>
      <Navigation links={menu.links} />


      <Link href='/cart'>
      Cart {cartCount }
      </Link>

    </div>
  )
}