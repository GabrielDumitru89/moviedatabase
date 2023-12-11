import React from 'react'
import styles from "../../styles/Template.module.scss"
const Template = ({ children }) => {
  return (
    <div className={styles.templates}>
      {children}
    </div>
  )
}

export default Template
