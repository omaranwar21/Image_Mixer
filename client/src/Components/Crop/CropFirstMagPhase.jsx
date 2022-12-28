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
    originalFirstURL
  } = useContext(FileContext);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {/* <button>
          crop image 1
        </button> */}
        <div>
          {checkMode !== true ? (
            <ReactCrop crop={magFirstCrop} onChange={(c, per) => setMagFirstCrop(per)}
              onComplete={(px, percent) => {
                axios.post('/select',
                  percent
                ).then((response) => {
                  console.log(response)
                }).catch((err) => {
                  console.log(err)
                })
              }}>
              <img style={{ width: originalFirstURL !== null ? "20rem" : "0", height: originalFirstURL !== null ? "10rem" : "0" }} src={magnitudeFirstURL} />
            </ReactCrop>
          ) :
            <img style={{ width: firstFile !== undefined ? "20rem" : "0", height: firstFile !== undefined ? "10rem" : "0" }} src={magnitudeFirstURL} />
          }
        </div>
        <div>
          {checkMode !== true ? (
            <ReactCrop crop={phaseFirstCrop} onChange={(c, per) => setPhaseFirstCrop(per)}
              onComplete={(px, percent) => {
                axios.post('/select',
                  percent
                ).then((response) => {
                  console.log(response)
                }).catch((err) => {
                  console.log(err)
                })
              }}>
              <img style={{ width: originalFirstURL !== null ? "20rem" : "0", height: originalFirstURL !== null ? "10rem" : "0" }} src={phaseFirstURL} />
            </ReactCrop>
          ) :
            <img style={{ width: firstFile !== undefined ? "20rem" : "0", height: firstFile !== undefined ? "10rem" : "0" }} src={phaseFirstURL} />
          }
        </div>
      </div>
    </>
  )
}

export default CropFirstMagPhase