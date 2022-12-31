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
    checkMerge,
    setCheckMerge,
    originalFirstImgId,
    firstCrop,
    originalSecondImgId,
    secondCrop,
    magSecondCrop,
    phaseSecondCrop,
    checkModeBinary,
    setCheckModeBinary
  } = useContext(FileContext);

  const handleClick1 = () => {
    setCheckMerge(1)
  }

  const handleClick2 = () => {
    setCheckMerge(0)
  }

  console.log(checkMerge);

  return (
    <div className='first-mag-phase-container'>
      <div className='first-mag-phase-2ndcontainer'>
        <div className='space'> </div>
        <div className="test">
          {/* <button>
            crop image 1
          </button> */}
          <div className='image-first-mag-phase'>
            {checkMode !== true && checkMerge === 1 ? (
              <button onClick={handleClick1} style={{ backgroundColor: "transparent", borderColor: checkMerge === 1 ? "red" : "transparent", width: view, height: view }}>
                <ReactCrop crop={magFirstCrop} onChange={(c, per) => setMagFirstCrop(per)}
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
                  <img style={{ width: originalFirstURL !== null ? view : view, height: originalFirstURL !== null ? view : view }} src={magnitudeFirstURL} />
                </ReactCrop>
              </button>
            ) :
              <button onClick={handleClick1} style={{ backgroundColor: "transparent", borderColor: checkMerge === 1 ? "red" : "transparent" }}>
                <img style={{ width: firstFile !== undefined ? view : view, height: firstFile !== undefined ? view : view }} src={magnitudeFirstURL} />
              </button>
            }
          </div>
          <div className='image-first-mag-phase'>
            {checkMode !== true && checkMerge === 0 ? (
              <button onClick={handleClick2} style={{ backgroundColor: "transparent", borderColor: checkMerge === 0 ? "red" : "transparent", width: view, height: view }}>
                <ReactCrop crop={phaseFirstCrop} onChange={(c, per) => setPhaseFirstCrop(per)}
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
                  <img style={{ width: originalFirstURL !== null ? view : view, height: originalFirstURL !== null ? view : view }} src={phaseFirstURL} />
                </ReactCrop>
              </button>
            ) :
              <button onClick={handleClick2} style={{ backgroundColor: "transparent", borderColor: checkMerge === 0 ? "red" : "transparent" }}>
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