import React, { useContext, useEffect , useState } from 'react'
import { FileContext } from '../../contexts/fileContext'
import './Result.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


const Result = () => {
  
  const {
    resultURL,
    passMode,
    setPassMode,
    setResultURL,
    firstFile,
    secondFile,
    checkMode,
    setCheckMode,
    passModeBinary,
    setPassModeBinary
  } = useContext(FileContext);
  
  useEffect(() => {
    if (passMode === false) {
      setPassModeBinary(0)
    } else {
      setPassModeBinary(1)
    }
  }, [passMode])

  return (
    <div className='result'>
      <div className='switch'>
          <BootstrapSwitchButton
              className = "custom-btn"
              checked={passMode}
              onlabel='High Pass'
              onstyle='primary'
              offlabel='Low Pass'
              offstyle='danger'
              style='w-1000 mx-2'
              onChange={(e) => {
                setPassMode(!passMode)
              }}
          />
        </div>
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