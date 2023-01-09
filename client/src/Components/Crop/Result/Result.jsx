import React, { useContext, useEffect, useState } from 'react'
import { FileContext } from '../../contexts/fileContext'
import './Result.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import axios from "../../../Global/API/axios"


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
    setPassModeBinary,
    originalFirstImgId,
    firstCrop,
    originalSecondImgId,
    secondCrop,
    magFirstCrop,
    phaseFirstCrop,
    magSecondCrop,
    phaseSecondCrop,
    checkModeBinary,
    checkMerge
  } = useContext(FileContext);

  useEffect(() => {
    if (passMode === false) {
      setPassModeBinary(0)
    } else {
      setPassModeBinary(1)
    }
  }, [passMode])


  useEffect(() => {
    axios.post('/select',
      {
        "fid": originalFirstImgId,
        "firstCrop": firstCrop,
        "sid": originalSecondImgId,
        "secondCrop": secondCrop,
        "magFirstCrop": magFirstCrop,
        "phaseFirstCrop": phaseFirstCrop,
        "magSecondCrop": magSecondCrop,
        "phaseSecondCrop": phaseSecondCrop,
        "mode": checkModeBinary,
        "flag": checkMerge,
        "filter": passModeBinary
      }
    ).then((response) => {
      console.log(response)
      setResultURL(response.data.result_url)
    }).catch((err) => {
      //console.log(err)
    })
  }, [passModeBinary])

  return (
    <div className='result'>
          <div className='filter-switch'>
            <BootstrapSwitchButton
              className="custom-btn"
              checked={passMode}
              onlabel='Inside'
              onstyle='danger'
              offlabel='Outside'
              offstyle='primary'
              style='w-1000 mx-2'
              onChange={(e) => {
                setPassMode(!passMode)
              }}
            />
          </div>
      <div className='image-result'>
        <div className="borders up">
          <div className='back'></div>
          <div className='back'></div>
        </div>
        <img style={{ width: "40vh", height: "40vh", display: resultURL === undefined ? "none" : null }} src={resultURL} alt="" />
        <div className="borders down">
          <div className='back'></div>
          <div className='back'></div>
        </div>
      </div>
    </div>
  )
}

export default Result