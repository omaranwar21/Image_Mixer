import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext, useState } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../../Global/API/axios'

const CropFirstMagPhase = () => {
  const {
    phaseFirstURL,
    setphaseFirstURL,
    magnitudeFirstURL,
    setMagnitudeFirstURL,
    checkMode,
    magFirstCrop,
    setMagFirstCrop,
    phaseFirstCrop,
    setPhaseFirstCrop,
    firstFile,
    originalFirstURL,
    mo,
    setMo,
    originalFirstImgId,
    firstCrop,
    originalSecondImgId,
    secondCrop,
    magSecondCrop,
    phaseSecondCrop,
  } = useContext(FileContext);

  const handleClick1 = () => {
    setMo(true)
  }

  const handleClick2 = () => {
    setMo(false)
  }

  console.log(mo);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {/* <button>
          crop image 1
        </button> */}
        <div>
          {checkMode !== true && mo === true ? (
            <button onClick={handleClick1} style={{backgroundColor:"transparent",borderColor: mo === true ? "red" : "transparent"}}>
              <ReactCrop crop={magFirstCrop} onChange={(c, per) => setMagFirstCrop(per)}
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
                <img style={{ width: originalFirstURL !== null ? "8rem" : "0", height: originalFirstURL !== null ? "8rem" : "0" }} src={magnitudeFirstURL} />
              </ReactCrop>
            </button>
          ) :
            <button onClick={handleClick1} style={{backgroundColor:"transparent",borderColor: mo === true ? "red" : "transparent"}}>
              <img style={{ width: firstFile !== undefined ? "8rem" : "0", height: firstFile !== undefined ? "8rem" : "0" }} src={magnitudeFirstURL} />
            </button>
          }
        </div>
        <div>
          {checkMode !== true && mo === false ? (
            <button onClick={handleClick2} style={{backgroundColor:"transparent",borderColor: mo === false ? "red" : "transparent"}}>
              <ReactCrop crop={phaseFirstCrop} onChange={(c, per) => setPhaseFirstCrop(per)}
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
                <img style={{ width: originalFirstURL !== null ? "8rem" : "0", height: originalFirstURL !== null ? "8rem" : "0" }} src={phaseFirstURL} />
              </ReactCrop>
            </button>
          ) :
            <button onClick={handleClick2}  style={{backgroundColor:"transparent",borderColor: mo === false ? "red" : "transparent"}}>
              <img style={{ width: firstFile !== undefined ? "8rem" : "0", height: firstFile !== undefined ? "8rem" : "0" }} src={phaseFirstURL} />
            </button>
          }
        </div>
      </div>
    </>
  )
}

export default CropFirstMagPhase