import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../../Global/API/axios'

const CropImg = () => {

    const { firstCrop, setFirstCrop,firstFile,setFirstFile,secondCrop, setSecondCrop,secondFile,setSecondFile} = useContext(FileContext);

    const onFileFirstUpload = (e) => {
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
    console.log(secondCrop);

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
    return (
        <>
        <div>
            <input type="file" onChange={onFileFirstUpload} />
            <ReactCrop crop={firstCrop} onChange={c => setFirstCrop(c)}>
                <img style={{ width: "20rem", height: "20rem" }} alt='not reloaded' src={firstFile} />
            </ReactCrop>
        </div>
        <div>
            <input type="file" onChange={onFileSecondUpload} />
            <ReactCrop crop={secondCrop} onChange={c => setSecondCrop(c)}>
                <img style={{ width: "20rem", height: "20rem" }} alt='not reloaded' src={secondFile} />
            </ReactCrop>
        </div>
        </>
    )
}

export default CropImg


