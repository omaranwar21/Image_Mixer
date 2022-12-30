import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext, useRef } from 'react'
import { FileContext } from '../../contexts/fileContext'
import axios from '../../../Global/API/axios'
import './CropSecondImg.css'


const CropSecondImg = () => {
    const inputFile = useRef(null);
    const {
        secondCrop,
        setSecondCrop,
        secondFile,
        setSecondFile,
        checkMode,
        setCheckMode,
        originalSecondURL,
        setOriginalSecondURL,
        phaseSecondURL,
        setphaseSecondURL,
        magnitudeSecondURL,
        setMagnitudeSecondURL,
        setOriginalSecondImgId,
        originalFirstImgId,
        firstCrop,
        originalSecondImgId,
        magFirstCrop,
        phaseFirstCrop,
        magSecondCrop,
        phaseSecondCrop,
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
                setOriginalSecondImgId(response.data.imgId)
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

    return (
        <div>
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
            {checkMode === true ? (
                <ReactCrop crop={secondCrop} onChange={(px, per) => setSecondCrop(per)}
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
                    }}
                >
                    <img style={{ width: originalSecondURL !== null ? "17rem" : "0", height: originalSecondURL !== null ? "17rem" : "0"}} src={originalSecondURL} />
                </ReactCrop>
            ) :
                <img style={{ width: secondFile !== undefined ? "17rem" : "0", height: secondFile !== undefined ? "17rem" : "0" }} src={originalSecondURL} />
            }

        </div>
    )
}

export default CropSecondImg