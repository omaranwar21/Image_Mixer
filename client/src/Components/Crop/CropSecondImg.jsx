import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext, useRef } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../../Global/API/axios'


const CropSecondImg = () => {
    const inputFile = useRef(null);
    const { secondCrop,
        setSecondCrop,
        secondFile,
        setSecondFile,
        selectOriginalSecond,
        setSelectOriginalSecond,
        originalSecondURL,
        setOriginalSecondURL,
        phaseSecondURL,
        setphaseSecondURL,
        magnitudeSecondURL,
        setMagnitudeSecondURL
    } = useContext(FileContext);

    const onFileSecondUpload = (e) => {
        setSecondFile(URL.createObjectURL(e.target.files[0]));
        const formData = new FormData();
        formData.append("Img", e.target.files[0])
        axios.post('/img',
            formData
        ).then((response) => {
            setOriginalSecondURL(response.data.img_url)
            axios.get(`/combImg?imgId=${response.data.imgId}`
            ).then((response) => {
                setMagnitudeSecondURL(response.data.mag_img_url)
                setphaseSecondURL(response.data.phase_img_url)
                console.log(response)
            }).catch((err) => {
                console.log(err)
            })
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }
    console.log(secondFile);
    console.log(secondCrop);

    const handleButtonClick = () => {
        inputFile.current.click();
    };

    const handleImgDelete = () => {
        setOriginalSecondURL(null)
        setSecondFile(undefined)
        inputFile.current.value = null
    }

    const handleSelectClick = () => {
        setSelectOriginalSecond(!selectOriginalSecond)
    }

    console.log(selectOriginalSecond);

    return (
        <div>
            <img src={magnitudeSecondURL} alt="" />
            <img src={phaseSecondURL} alt="" />
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
                <ReactCrop crop={secondCrop} onChange={(px, per) => setSecondCrop(per)}
                    onComplete={(px, percent) => {
                        axios.post('/select',
                            percent
                        ).then((response) => {
                            console.log(response)
                        }).catch((err) => {
                            console.log(err)
                        })
                    }}
                >
                    <img style={{ width: originalSecondURL !== null ? "20rem" : "0", height: originalSecondURL !== null ? "20rem" : "0"}} src={originalSecondURL} />
                </ReactCrop>
            ) :
                <img style={{ width: secondFile !== undefined ? "20rem" : "0", height: secondFile !== undefined ? "20rem" : "0" }} src={originalSecondURL} />
            }

        </div>
    )
}

export default CropSecondImg