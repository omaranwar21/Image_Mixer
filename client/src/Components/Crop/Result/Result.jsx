import React, { useContext, useEffect , useState } from 'react'
import { FileContext } from '../../contexts/fileContext'
import './Result.css'

const Result = () => {

    const {
        resultURL,
        setResultURL
      } = useContext(FileContext);

  return (
    <div>
        <img style={{width:"15rem",height:"15rem"}} src={resultURL} alt="" />
    </div>
  )
}

export default Result