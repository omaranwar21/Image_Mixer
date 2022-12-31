import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext, useState } from 'react'
import { FileContext } from '../../contexts/fileContext'
import axios from '../../../Global/API/axios'
import './CropFirstMagPhase.css'

const view = "23vh"

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
    <div className='first-mag-phase-container'>
      <div className='first-mag-phase-2ndcontainer'>
        <div className='space'> </div>
        <div className = "test">
          {/* <button>
            crop image 1
          </button> */}
          <div className='image-first-mag-phase'>
            {checkMode !== true && mo === true ? (
              <button onClick={handleClick1} style={{backgroundColor:"transparent",borderColor: mo === true ? "red" : "transparent", width: view, height: view}}>
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
                  <img style={{ width: originalFirstURL !== null ? view : view, height: originalFirstURL !== null ? view : view}} src={magnitudeFirstURL} />
                </ReactCrop>
              </button>
            ) :
              <button onClick={handleClick1} style={{backgroundColor:"transparent",borderColor: mo === true ? "red" : "transparent"}}>
                <img style={{ width: firstFile !== undefined ? view : view, height: firstFile !== undefined ? view : view }} src={magnitudeFirstURL} />
              </button>
            }
          </div>
          <div className='image-first-mag-phase'>
            {checkMode !== true && mo === false ? (
              <button onClick={handleClick2} style={{backgroundColor:"transparent",borderColor: mo === false ? "red" : "transparent", width: view, height: view}}>
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
                  <img style={{ width: originalFirstURL !== null ? view : view, height: originalFirstURL !== null ? view : view}} src={phaseFirstURL} />
                </ReactCrop>
              </button>
            ) :
              <button onClick={handleClick2}  style={{backgroundColor:"transparent",borderColor: mo === false ? "red" : "transparent"}}>
                <img style={{ width: firstFile !== undefined ? view : view, height: firstFile !== undefined ? view : view }} src={phaseFirstURL} />
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropFirstMagPhase