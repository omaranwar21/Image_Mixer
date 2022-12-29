import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext, useState } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../../Global/API/axios'

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
    <>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {/* <button>
          crop image 1
        </button> */}
        <div>
          {checkMode !== true && mo === false ? (
            <button onClick={handleClick2} style={{backgroundColor:"transparent",borderColor: mo === false ? "red" : "transparent"}}>
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
                <img style={{ width: originalSecondURL !== null ? "8rem" : "0", height: originalSecondURL !== null ? "8rem" : "0" }} src={magnitudeSecondURL} />
              </ReactCrop>
            </button>
          ) :
            <button onClick={handleClick2} style={{backgroundColor:"transparent",borderColor: mo === false ? "red" : "transparent"}}>
              <img style={{ width: secondFile !== undefined ? "8rem" : "0", height: secondFile !== undefined ? "8rem" : "0" }} src={magnitudeSecondURL} />
            </button>
          }
        </div>
        <div>
          {checkMode !== true && mo === true  ? (
            <button onClick={handleClick1} style={{backgroundColor:"transparent",borderColor: mo === true ? "red" : "transparent"}}>
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
                <img style={{ width: originalSecondURL !== null ? "8rem" : "0", height: originalSecondURL !== null ? "8rem" : "0" }} src={phaseSecondURL} />
              </ReactCrop>
            </button>
          ) :
            <button onClick={handleClick1} style={{backgroundColor:"transparent",borderColor: mo === true ? "red" : "transparent"}}>
              <img style={{ width: secondFile !== undefined ? "8rem" : "0", height: secondFile !== undefined ? "8rem" : "0" }} src={phaseSecondURL} />
            </button>
          }
        </div>
      </div>
    </>
  )
}

export default CropSecondMagPhase