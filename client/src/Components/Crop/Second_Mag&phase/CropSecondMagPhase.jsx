import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext, useState } from 'react'
import { FileContext } from '../../contexts/fileContext'
import axios from '../../../Global/API/axios'
import './CropSecondMagPhase.css'

const view = "23vh"

const CropSecondMagPhase = () => {
  const {
    originalSecondURL,
    phaseSecondURL,
    setphaseSecondURL,
    magnitudeSecondURL,
    setMagnitudeSecondURL,
    magSecondCrop,
    setMagSecondCrop,
    phaseSecondCrop,
    setPhaseSecondCrop,
    checkMode,
    secondFile,
    mo,
    setMo,
    originalFirstImgId,
    firstCrop,
    originalSecondImgId,
    secondCrop,
    magFirstCrop,
    phaseFirstCrop,
  } = useContext(FileContext);

  const handleClick1 = () => {
    setMo(true)
  }

  const handleClick2 = () => {
    setMo(false)
  }

  return (
    <div className='second-mag-phase-container'>
      <div className='second-mag-phase-2ndcontainer'>
        <div className='space'></div>
        <div className='test'>
          {/* <button>
            crop image 1
          </button> */}
          <div className='image-second-mag-phase'>
            {checkMode !== true && mo === false ? (
              <button onClick={handleClick2} style={{backgroundColor:"transparent",borderColor: mo === false ? "red" : "transparent", width: view, height: view}}>
                <ReactCrop crop={magSecondCrop} onChange={(c, per) => setMagSecondCrop(per)}
                  onComplete={(px, percent) => {
                    axios.post('/select',
                    {
                      "original_First_Id" : originalFirstImgId,
                      "original_First_Crop" : firstCrop,
                      "original_Second_Id" : originalSecondImgId,
                      "original_Second_Crop" : secondCrop,
                      "mag_First_Id" : `mag${originalFirstImgId}`,
                      "mag_First_Crop" : magFirstCrop,
                      "phase_First_Id" : `phase${originalFirstImgId}`,
                      "phase_First_Crop" : phaseFirstCrop,
                      "mag_Second_Id" : `mag${originalSecondImgId}`,
                      "mag_Second_Crop" : magSecondCrop,
                      "phase_Second_Id" : `phase${originalSecondImgId}`,
                      "phase_Second_Crop" : phaseSecondCrop,
                  }
                    ).then((response) => {
                      console.log(response)
                    }).catch((err) => {
                      console.log(err)
                    })
                  }}>
                  <img style={{ width: originalSecondURL !== null ? view : view, height: originalSecondURL !== null ? view : view }} src={magnitudeSecondURL} />
                </ReactCrop>
              </button>
            ) :
              <button onClick={handleClick2} style={{backgroundColor:"transparent",borderColor: mo === false ? "red" : "transparent"}}>
                <img style={{ width: secondFile !== undefined ? view : view, height: secondFile !== undefined ? view : view }} src={magnitudeSecondURL} />
              </button>
            }
          </div>
          <div className='image-second-mag-phase'>
            {checkMode !== true && mo === true  ? (
              <button onClick={handleClick1} style={{backgroundColor:"transparent",borderColor: mo === true ? "red" : "transparent", width: view, height: view}}>
                <ReactCrop crop={phaseSecondCrop} onChange={(c, per) => setPhaseSecondCrop(per)}
                  onComplete={(px, percent) => {
                    axios.post('/select',
                    {
                      "original_First_Id" : originalFirstImgId,
                      "original_First_Crop" : firstCrop,
                      "original_Second_Id" : originalSecondImgId,
                      "original_Second_Crop" : secondCrop,
                      "mag_First_Id" : `mag${originalFirstImgId}`,
                      "mag_First_Crop" : magFirstCrop,
                      "phase_First_Id" : `phase${originalFirstImgId}`,
                      "phase_First_Crop" : phaseFirstCrop,
                      "mag_Second_Id" : `mag${originalSecondImgId}`,
                      "mag_Second_Crop" : magSecondCrop,
                      "phase_Second_Id" : `phase${originalSecondImgId}`,
                      "phase_Second_Crop" : phaseSecondCrop,
                  }
                    ).then((response) => {
                      console.log(response)
                    }).catch((err) => {
                      console.log(err)
                    })
                  }}>
                  <img style={{ width: originalSecondURL !== null ? view : view, height: originalSecondURL !== null ? view : view }} src={phaseSecondURL} />
                </ReactCrop>
              </button>
            ) :
              <button onClick={handleClick1} style={{backgroundColor:"transparent",borderColor: mo === true ? "red" : "transparent"}}>
                <img style={{ width: secondFile !== undefined ? view : view, height: secondFile !== undefined ? view : view}} src={phaseSecondURL} />
              </button>
            }
            </div>
          </div>
      </div>
    </div>
  )
}

export default CropSecondMagPhase