import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext, useRef, useState } from 'react'
import { FileContext } from '../../contexts/fileContext'
import axios from '../../../Global/API/axios'
import './CropFirstImg.css'
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaCrop } from 'react-icons/fa';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


const CropFirstImg = () => {
    const inputFile = useRef(null);
    const {
        firstCrop,
        setFirstCrop,
        firstFile,
        setFirstFile,
        checkMode,
        setCheckMode,
        magnitudeFirstURL,
        setMagnitudeFirstURL,
        phaseFirstURL,
        setphaseFirstURL,
        originalFirstURL,
        setOriginalFirstURL,
        setOriginalFirstImgId,
        originalFirstImgId,
        originalSecondImgId,
        secondCrop,
        magFirstCrop,
        phaseFirstCrop,
        magSecondCrop,
        phaseSecondCrop,
    } = useContext(FileContext);

    const handleFileFirstUpload = (e) => {
        setFirstFile(URL.createObjectURL(e.target.files[0]));
        const formData = new FormData();
        formData.append("Img", e.target.files[0])
        axios.post('/img',
            formData
        ).then((response) => {
            setOriginalFirstURL(response.data.img_url)
            axios.get(`/combImg?imgId=${response.data.imgId}`
            ).then((response) => {
                setMagnitudeFirstURL(response.data.mag_img_url)
                setphaseFirstURL(response.data.phase_img_url)
                setOriginalFirstImgId(response.data.imgId)
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
        setOriginalFirstURL(null)
        setFirstFile(undefined)
        inputFile.current.value = null
    }

    const handleSelectClick = () => {
        setCheckMode(!checkMode)
    }

    console.log(checkMode);

    return (
        <div className='first-image-container'>
            <div className="first-image">

                <div className='buttons'>
                    <div>
                    <BootstrapSwitchButton
                        checked={false}
                        onlabel='Admin User'
                        onstyle='danger'
                        offlabel='Regular User'
                        offstyle='success'
                        style='w-50 mx-2'
                        onChange={() => {
                            setCheckMode(!checkMode)
                        }}
                    />
                    </div>
                    <button onClick={handleButtonClick}>
                        <BsFillCloudUploadFill />
                    </button>
                    <button onClick={handleImgDelete}>
                        <AiTwotoneDelete />
                    </button>
                    <input
                        type='file'
                        id='file'
                        ref={inputFile}
                        style={{ display: 'none' }}
                        onChange={handleFileFirstUpload}
                    />
                </div>
                <div className='image'>
                    {checkMode === true ? (
                        <ReactCrop crop={firstCrop} onChange={(c, per) => setFirstCrop(per)}
                            onComplete={(px, percent) => {
                                axios.post('/select',
                                    {
                                        "original_First_Id": originalFirstImgId,
                                        "original_First_Crop": firstCrop,
                                        "original_Second_Id": originalSecondImgId,
                                        "original_Second_Crop": secondCrop,
                                        "mag_First_Id": `mag${originalFirstImgId}`,
                                        "mag_First_Crop": magFirstCrop,
                                        "phase_First_Id": `phase${originalFirstImgId}`,
                                        "phase_First_Crop": phaseFirstCrop,
                                        "mag_Second_Id": `mag${originalSecondImgId}`,
                                        "mag_Second_Crop": magSecondCrop,
                                        "phase_Second_Id": `phase${originalSecondImgId}`,
                                        "phase_Second_Crop": phaseSecondCrop,
                                    }
                                ).then((response) => {
                                    console.log(response)
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }}>
                            <img style={{ width: originalFirstURL !== null ? "auto" : "auto", height: originalFirstURL !== null ? "40vh" : "auto", marginTop: "auto", marginBottom: "auto" }} src={originalFirstURL} />
                        </ReactCrop>
                    ) :
                        <img style={{ width: firstFile !== undefined ? "auto" : "auto", height: firstFile !== undefined ? "40vh" : "auto", marginTop: "auto", marginBottom: "auto" }} src={originalFirstURL} />
                    }
                </div>

            </div>
        </div>
    )
}

export default CropFirstImg


