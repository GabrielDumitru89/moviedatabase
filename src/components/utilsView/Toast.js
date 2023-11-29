import React from 'react'
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
const Toast = () => {
  return (
    <ToastContainer
      className='mr-16'
      position='bottom-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme='light'
    />
  )
}

export default Toast
