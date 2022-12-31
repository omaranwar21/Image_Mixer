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
    checkMerge,
    setCheckMerge,
    originalFirstImgId,
    firstCrop,
    originalSecondImgId,
    secondCrop,
    magFirstCrop,
    phaseFirstCrop,
    checkModeBinary,
    setCheckModeBinary
  } = useContext(FileContext);

  const handleClick1 = () => {
    setCheckMerge(1)
  }

  const handleClick2 = () => {
    setCheckMerge(0)
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
            {checkMode !== true && checkMerge === 0 ? (
              <button onClick={handleClick2} style={{ backgroundColor: "transparent", borderColor: checkMerge === 0 ? "red" : "transparent", width: view, height: view, display: secondFile === undefined ? "none" : null }}>
                <ReactCrop crop={magSecondCrop} onChange={(c, per) => setMagSecondCrop(per)}
                  onComplete={(px, percent) => {
                    axios.post('/select',
                      {
                        "original_First_Id": originalFirstImgId,
                        "original_First_Crop": firstCrop,
                        "original_Second_Id": originalSecondImgId,
                        "original_Second_Crop": secondCrop,
                        "mag_First_Crop": magFirstCrop,
                        "phase_First_Crop": phaseFirstCrop,
                        "mag_Second_Crop": magSecondCrop,
                        "phase_Second_Crop": phaseSecondCrop,
                        "check_mode": checkModeBinary,
                        "check_merge": checkMerge,
                      }
                    ).then((response) => {
                      console.log(response)
                    }).catch((err) => {
                      console.log(err)
                    })
                  }}>
                  <img style={{ width: originalSecondURL !== null ? view : view, height: originalSecondURL !== null ? view : view, display: secondFile === undefined ? "none" : null }} src={magnitudeSecondURL} />
                </ReactCrop>
              </button>
            ) :
              <button onClick={handleClick2} style={{ backgroundColor: "transparent", borderColor: checkMerge === 0 ? "red" : "transparent", display: secondFile === undefined ? "none" : null }}>
                <img style={{ width: secondFile !== undefined ? view : view, height: secondFile !== undefined ? view : view, display: secondFile === undefined ? "none" : null }} src={magnitudeSecondURL} />
              </button>
            }
          </div>
          <div className='image-second-mag-phase'>
            {checkMode !== true && checkMerge === 1 ? (
              <button onClick={handleClick1} style={{ backgroundColor: "transparent", borderColor: checkMerge === 1 ? "red" : "transparent", width: view, height: view, display: secondFile === undefined ? "none" : null }}>
                <ReactCrop crop={phaseSecondCrop} onChange={(c, per) => setPhaseSecondCrop(per)}
                  onComplete={(px, percent) => {
                    axios.post('/select',
                      {
                        "original_First_Id": originalFirstImgId,
                        "original_First_Crop": firstCrop,
                        "original_Second_Id": originalSecondImgId,
                        "original_Second_Crop": secondCrop,
                        "mag_First_Crop": magFirstCrop,
                        "phase_First_Crop": phaseFirstCrop,
                        "mag_Second_Crop": magSecondCrop,
                        "phase_Second_Crop": phaseSecondCrop,
                        "check_mode": checkModeBinary,
                        "check_merge": checkMerge,
                      }
                    ).then((response) => {
                      console.log(response)
                    }).catch((err) => {
                      console.log(err)
                    })
                  }}>
                  <img style={{ width: originalSecondURL !== null ? view : view, height: originalSecondURL !== null ? view : view, display: secondFile === undefined ? "none" : null }} src={phaseSecondURL} />
                </ReactCrop>
              </button>
            ) :
              <button onClick={handleClick1} style={{ backgroundColor: "transparent", borderColor: checkMerge === 1 ? "red" : "transparent", display: secondFile === undefined ? "none" : null }}>
                <img style={{ width: secondFile !== undefined ? view : view, height: secondFile !== undefined ? view : view, display: secondFile === undefined ? "none" : null }} src={phaseSecondURL} />
              </button>
            }
          </div>
        </div>
        <div className='space space-right'> </div>
      </div>
    </div>
  )
}

export default CropSecondMagPhase