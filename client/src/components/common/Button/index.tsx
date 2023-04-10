import React from 'react';
import './style.css'

function index(props:any) {
  return (
    <button
      className='button button--flex mt-4'
      onClick={props.onClick}
      type={props.type}
    >{props.name}</button>
  )
}

export default index
