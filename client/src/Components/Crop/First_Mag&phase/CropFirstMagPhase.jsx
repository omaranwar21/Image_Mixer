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
    setCheckModeBinary,
    resultURL,
    setResultURL,
    btnFlag,
    setBtnFlag
  } = useContext(FileContext);

  const handleClick1 = () => {
    if (btnFlag === 1) {
      setCheckMerge(1)
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
        "flag": !checkMerge,
      }
      ).then((response) => {
      //console.log(response)
      setResultURL(response.data.result_url)
    }).catch((err) => {
      //console.log(err)
    })
  }
  setBtnFlag(0)
  }

  const handleClick2 = () => {
    if (btnFlag === 0) {
      setCheckMerge(0)
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
        "flag": !checkMerge,
      }
      ).then((response) => {
        //console.log(response)
        setResultURL(response.data.result_url)
      }).catch((err) => {
        //console.log(err)
      })
    }
    setBtnFlag(1)
  }

  //console.log(checkMerge);

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
              <button onClick={handleClick1} style={{ backgroundColor: "transparent", borderColor: checkMerge === 1 ? "red" : "transparent", width: view, height: view, display: firstFile === undefined ? "none" : null }}>
                <ReactCrop crop={magFirstCrop} onChange={(c, per) => setMagFirstCrop(per)}
                  onComplete={(px, percent) => {
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
                      }
                    ).then((response) => {
                      //console.log(response)
                      setResultURL(response.data.result_url)
                      setCheckMerge(1)
                    }).catch((err) => {
                      //console.log(err)
                    })
                  }}>
                  <img style={{ width: originalFirstURL !== null ? view : view, height: originalFirstURL !== null ? view : view, display: firstFile === undefined ? "none" : null }} src={magnitudeFirstURL} />
                </ReactCrop>
              </button>
            ) :
              <button onClick={handleClick1} style={{ backgroundColor: "transparent", borderColor: checkMerge === 1 ? "red" : "transparent", display: firstFile === undefined ? "none" : null }}>
                <img style={{ width: firstFile !== undefined ? view : view, height: firstFile !== undefined ? view : view }} src={magnitudeFirstURL} />
              </button>
            }
          </div>
          <div className='image-first-mag-phase'>
            {checkMode !== true && checkMerge === 0 ? (
              <button onClick={handleClick2} style={{ backgroundColor: "transparent", borderColor: checkMerge === 0 ? "red" : "transparent", width: view, height: view, display: firstFile === undefined ? "none" : null }}>
                <ReactCrop crop={phaseFirstCrop} onChange={(c, per) => setPhaseFirstCrop(per)}
                  onComplete={(px, percent) => {
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
                      }
                    ).then((response) => {
                      //console.log(response)
                      // setResultURL("")
                      // //console.log("lol1");
                      //console.log(resultURL);
                      setResultURL(response.data.result_url)
                      // //console.log("lol2");
                      // //console.log(resultURL);
                    }).catch((err) => {
                      //console.log(err)
                    })
                  }}>
                  <img style={{ width: originalFirstURL !== null ? view : view, height: originalFirstURL !== null ? view : view, display: firstFile === undefined ? "none" : null }} src={phaseFirstURL} />
                </ReactCrop>
              </button>
            ) :
              <button onClick={handleClick2} style={{ backgroundColor: "transparent", borderColor: checkMerge === 0 ? "red" : "transparent", display: firstFile === undefined ? "none" : null }}>
                <img style={{ width: firstFile !== undefined ? view : view, height: firstFile !== undefined ? view : view, display: firstFile === undefined ? "none" : null }} src={phaseFirstURL} />
              </button>
            }
          </div>
        </div>
        <div className='space space-right'> </div>
      </div>
    </div>
  )
}

export default CropFirstMagPhase