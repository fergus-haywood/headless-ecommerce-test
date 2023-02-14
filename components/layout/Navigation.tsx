import styles from '../../styles/components/Layout/Navigation.module.css'


export default function Navigation({links}:any) { 



  return ( 


    <div className={styles.container}>

      {links.map((link:any) => ( 

        <p className={styles.link} key={link.title}>
          {link.title}
        </p>
      ))}


    </div>
  )

}