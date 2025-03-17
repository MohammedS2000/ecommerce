import React from 'react'
import {ReactComponent as ErrorNotFound} from '../images/error.svg'

export default function NotFound() {
  return (
    <div className='flex items-center justify-center my-8'>
        <ErrorNotFound/>
    </div>
  )
}
