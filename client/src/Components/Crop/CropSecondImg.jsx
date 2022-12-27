import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext, useRef } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../../Global/API/axios'


const CropSecondImg = () => {
    const inputFile = useRef(null);
    const {secondCrop,
           setSecondCrop,
           secondFile,
           setSecondFile,
           selectOriginalSecond,
           setSelectOriginalSecond
          } = useContext(FileContext);

    const onFileSecondUpload = (e) => {
        setSecondFile(URL.createObjectURL(e.target.files[0]));
        const formData = new FormData();
        formData.append("file2", e.target.files[0])
        // axios.post('',
        //     formData
        // ).then((response) => {
        //     console.log(response)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }
    console.log(secondFile);
    console.log(secondCrop);

    const handleButtonClick = () => {
        inputFile.current.click();
    };

    const handleImgDelete = () => {
        setSecondFile(undefined)
        inputFile.current.value = null
    }

    const handleSelectClick = () => {
        setSelectOriginalSecond(!selectOriginalSecond)
    }

    console.log(selectOriginalSecond);

    return (
        <div>
            <button onClick={handleSelectClick}>
                Crop image 2
            </button>
            <button onClick={handleButtonClick}>
                Upload image 2
            </button>
            <button onClick={handleImgDelete}>
				delete image 2
			</button>
            <input
                type='file'
                id='file'
                ref={inputFile}
                style={{ display: 'none' }}
                onChange={onFileSecondUpload}
            />
            {selectOriginalSecond === true ? (
                <ReactCrop crop={secondCrop} onChange={(px,per) => setSecondCrop(per)} onComplete={
                    (px,per) => {
    
                    }
                }>
                    <img  style={{ width: secondFile !== undefined ? "20rem" : null , height: secondFile !== undefined ? "20rem" : null  }} src={secondFile} />
                </ReactCrop>
            ) : 
            <img  style={{ width: secondFile !== undefined ? "20rem" : null , height: secondFile !== undefined ? "20rem" : null  }} src={secondFile} />
            }
            
        </div>
    )
}

export default CropSecondImg