import React, { createContext, useState } from 'react';
const FileContext = createContext();

const FileContextProvider = ({ children }) => {
    // original first
    const [firstFile, setFirstFile] = useState();
    const [originalFirstURL, setOriginalFirstURL] = useState()
    const [originalFirstImgId, setOriginalFirstImgId] = useState()
    const [firstCrop, setFirstCrop] = useState(
        {
            unit: '%', // Can be 'px' or '%'
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    )
    // original second
    const [secondFile, setSecondFile] = useState();
    const [originalSecondURL, setOriginalSecondURL] = useState()
    const [originalSecondImgId, setOriginalSecondImgId] = useState()
    const [secondCrop, setSecondCrop] = useState(
        {
            unit: '%', // Can be 'px' or '%'
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    )
    // mag + phase first
    const [magnitudeFirstURL, setMagnitudeFirstURL] = useState()
    const [phaseFirstURL, setphaseFirstURL] = useState()
    const [magFirstCrop, setMagFirstCrop] = useState(
        {
            unit: '%', // Can be 'px' or '%'
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    )
    const [phaseFirstCrop, setPhaseFirstCrop] = useState(
        {
            unit: '%', // Can be 'px' or '%'
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    )
    // mag + phase second
    const [magnitudeSecondURL, setMagnitudeSecondURL] = useState()
    const [phaseSecondURL, setphaseSecondURL] = useState()
    const [magSecondCrop, setMagSecondCrop] = useState(
        {
            unit: '%', // Can be 'px' or '%'
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    )
    const [phaseSecondCrop, setPhaseSecondCrop] = useState(
        {
            unit: '%', // Can be 'px' or '%'
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    )
    // global 
    const [checkMerge, setCheckMerge] = useState(1)
    const [checkMode, setCheckMode] = useState(false);
    const [checkModeBinary,setCheckModeBinary] = useState();

    return (
        <FileContext.Provider
            value={{
                firstCrop,
                setFirstCrop,
                firstFile,
                setFirstFile,
                secondCrop,
                setSecondCrop,
                secondFile,
                setSecondFile,
                originalFirstURL,
                setOriginalFirstURL,
                phaseFirstURL,
                setphaseFirstURL,
                magnitudeFirstURL,
                setMagnitudeFirstURL,
                originalSecondURL,
                setOriginalSecondURL,
                phaseSecondURL,
                setphaseSecondURL,
                magnitudeSecondURL,
                setMagnitudeSecondURL,
                checkMode,
                setCheckMode,
                magFirstCrop,
                setMagFirstCrop,
                phaseFirstCrop,
                setPhaseFirstCrop,
                magSecondCrop,
                setMagSecondCrop,
                phaseSecondCrop,
                setPhaseSecondCrop,
                checkMerge,
                setCheckMerge,
                originalFirstImgId,
                setOriginalFirstImgId,
                originalSecondImgId,
                setOriginalSecondImgId,
                checkModeBinary,
                setCheckModeBinary
            }}>
            {children}
        </FileContext.Provider>
    );
};

export { FileContext, FileContextProvider };