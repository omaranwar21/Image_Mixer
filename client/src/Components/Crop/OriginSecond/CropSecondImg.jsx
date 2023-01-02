import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext, useRef, useEffect } from 'react'
import { FileContext } from '../../contexts/fileContext'
import axios from '../../../Global/API/axios'
import './CropSecondImg.css'
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillCloudUploadFill } from 'react-icons/bs';

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
        checkModeBinary,
        setCheckModeBinary,
        checkMerge,
        setCheckMerge,
        resultURL,
        setResultURL,
        secondFileBinary,
        setSecondFileBinary,
        firstFileBinary,
        setFirstFileBinary,
        firstFile,
        originalFirstURL
    } = useContext(FileContext);

    useEffect(() => {
        if (secondFile !== undefined) {
            setSecondFileBinary(1)
        } else {
            setSecondFileBinary(0)
        }
    }, [secondFile])

    useEffect(() => {
        if (originalSecondURL === null && originalFirstURL !== null) {
            axios.get(`/gray?imgId=${originalFirstImgId}`)
            .then((res) => {
                console.log(res);
                setResultURL(res.data.gray_url)
            })
            .catch((err)=> {
                console.log(err);
            })
        }
    }, [originalSecondURL])


    const onFileSecondUpload = (e) => {
        setSecondFile(URL.createObjectURL(e.target.files[0]));
        const formData = new FormData();
        formData.append("Img", e.target.files[0])
        formData.append("f_file", firstFileBinary)
        formData.append("s_file", secondFileBinary)
        axios.post('/img',
            formData
        ).then((response) => {
            setOriginalSecondURL(response.data.img_url)
            setOriginalSecondImgId(response.data.imgId)
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

    const handleButtonClick = () => {
        inputFile.current.click();
    };

    const handleImgDelete = () => {
        setOriginalSecondURL(null)
        setMagnitudeSecondURL(null)
        setphaseSecondURL(null)
        setSecondFile(undefined)
        inputFile.current.value = null
    }

    return (
        <div className='second-image-container'>

            <div className="second-image">

                <div className='buttons-second'>
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
                        onChange={onFileSecondUpload}
                    />
                </div>
                <div className='image'>
                    {checkMode === true ? (
                        <ReactCrop crop={secondCrop} onChange={(px, per) => setSecondCrop(per)}
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
                                }).catch((err) => {
                                    //console.log(err)
                                })
                            }}
                        >
                            <img style={{ width: originalSecondURL !== null ? "auto" : "auto", height: originalSecondURL !== null ? "40vh" : "auto", marginTop: "auto", marginBottom: "auto" }} src={originalSecondURL} />
                        </ReactCrop>
                    ) :
                        <img style={{ width: secondFile !== undefined ? "auto" : "auto", height: secondFile !== undefined ? "40vh" : "auto", marginTop: "auto", marginBottom: "auto" }} src={originalSecondURL} />
                    }

                </div>
            </div>
        </div>
    )
}

export default CropSecondImg