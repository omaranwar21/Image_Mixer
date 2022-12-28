import React, { createContext, useState } from 'react';
const FileContext = createContext();

const FileContextProvider = ({ children }) => {
    // original first
    const [firstFile,setFirstFile] = useState();
    const [checkMode , setCheckMode] = useState(false);
    const [originalFirstURL, setOriginalFirstURL] = useState()
    const [firstCrop, setFirstCrop] = useState({
        unit: '%', // Can be 'px' or '%'
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })
    // original second
    const [secondFile,setSecondFile] = useState();
    const [originalSecondURL, setOriginalSecondURL] = useState()
    const [secondCrop, setSecondCrop] = useState({
        unit: '%', // Can be 'px' or '%'
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })
    // mag + phase first
    const [magnitudeFirstURL, setMagnitudeFirstURL] = useState()
    const [phaseFirstURL, setphaseFirstURL] = useState()
    const [magFirstCrop, setMagFirstCrop] = useState()
    const [phaseFirstCrop, setPhaseFirstCrop] = useState()
    // mag + phase second
    const [magnitudeSecondURL, setMagnitudeSecondURL] = useState()
    const [phaseSecondURL, setphaseSecondURL] = useState()
	
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
            setPhaseFirstCrop
            }}>
			{children}
		</FileContext.Provider>
	);
};

export { FileContext, FileContextProvider };