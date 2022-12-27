import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext, useRef, useState } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../../Global/API/axios'

const CropFirstImg = () => {
    const [originalURL, setOriginalURL] = useState()
    const [phaseURL, setphaseURL] = useState()
    const [magnitudeURL, setMagnitudeURL] = useState()
    const inputFile = useRef(null);
    const { 
        firstCrop,
        setFirstCrop,
        firstFile,
        setFirstFile,
        selectOriginalFirst,
        setSelectOriginalFirst
        } = useContext(FileContext);

    const handleFileFirstUpload = (e) => {
        setFirstFile(URL.createObjectURL(e.target.files[0]));
        const formData = new FormData();
        formData.append("Img", e.target.files[0])
        axios.post('/img',
            formData
        ).then((response) => {
            setOriginalURL(response.data.img_url)
            axios.get(`/combImg?imgId=${response.data.imgId}`
            ).then((response) => {
                setMagnitudeURL(response.data.mag_img_url)
                setphaseURL(response.data.phase_img_url)
                console.log(response)
            }).catch((err) => {
                console.log(err)
            })
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }
    console.log(firstFile);
    console.log(firstCrop);

    const handleButtonClick = () => {
        inputFile.current.click();
    };

    const handleImgDelete = () => {
        setOriginalURL(null)
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
                    crop image 1
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
                    <ReactCrop crop={firstCrop} onChange={(c, per) => setFirstCrop(per)}
                        onComplete={(px, percent) => {
                            // axios.post('',
                            //     formData
                            // ).then((response) => {
                            //     console.log(response)
                            // }).catch((err) => {
                            //     console.log(err)
                            // })
                        }}>
                        <img style={{ width: originalURL !== null ? "20rem" : "0", height: originalURL !== null? "20rem" : "0" }} src={originalURL} />
                    </ReactCrop>
                ) :
                    <img style={{ width: firstFile !== undefined ? "20rem" : "0", height: firstFile !== undefined ? "20rem" : "0" }} src={originalURL} />
                }

            </div>
        </>
    )
}

export default CropFirstImg


