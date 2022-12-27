import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext, useRef, useState } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../../Global/API/axios'

const CropFirstImg = () => {
    const inputFile = useRef(null);
    const { firstCrop, setFirstCrop, firstFile, setFirstFile,selectOriginalFirst , setSelectOriginalFirst} = useContext(FileContext);

    const handleFileFirstUpload = (e) => {
        setFirstFile(URL.createObjectURL(e.target.files[0]));
        const formData = new FormData();
        formData.append("file1", e.target.files[0])
        // axios.post('',
        //     formData
        // ).then((response) => {
        //     console.log(response)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }
    console.log(firstFile);
    console.log(firstCrop);

    const handleButtonClick = () => {
        inputFile.current.click();
    };

    const handleImgDelete = () => {
        setFirstFile(undefined)
        inputFile.current.value = null
    }

    const handleSelectClick = () => {
        setSelectOriginalFirst(!selectOriginalFirst)
    }

    console.log(selectOriginalFirst);

    return (
        <>
            <div>
                <button onClick={handleSelectClick}>
                    crop image 
                </button>
                <button onClick={handleButtonClick}>
                    Upload image 1
                </button>
                <button onClick={handleImgDelete}>
                    delete image 1
                </button>
                <input
                    type='file'
                    id='file'
                    ref={inputFile}
                    style={{ display: 'none' }}
                    onChange={handleFileFirstUpload}
                />
                {selectOriginalFirst === true ? (
                        <ReactCrop crop={firstCrop} onChange={(c,per) => setFirstCrop(per)}
                        onComplete={(px, percent) => {
                            // axios.post('',
                            //     formData
                            // ).then((response) => {
                            //     console.log(response)
                            // }).catch((err) => {
                            //     console.log(err)
                            // })
                        }}>
                        <img style={{ width: firstFile !== undefined ? "20rem" : null, height: firstFile !== undefined ? "20rem" : null }} src={firstFile} />
                    </ReactCrop>
                ) : 
                <img style={{ width: firstFile !== undefined ? "20rem" : null, height: firstFile !== undefined ? "20rem" : null }} src={firstFile} />
                }
                
            </div>
        </>
    )
}

export default CropFirstImg


