import React, { useContext, useEffect , useState } from 'react'
import { FileContext } from '../../contexts/fileContext'
import './Result.css'

const Result = () => {

    const {
        resultURL,
        setResultURL,
        firstFile,
        secondFile,
      } = useContext(FileContext);
    
  return (
    <div className='result'>
      <div className='image-result'>
          <div className="borders up">
            <div></div>
            <div></div>
          </div>
          <img style={{width: "40vh",height: "40vh", display: resultURL === undefined ? "none" : null}} src={resultURL} alt="" />
          <div className="borders down">
            <div></div>
            <div></div>
          </div>
      </div>
    </div>
  )
}

export default Result