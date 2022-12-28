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
    const [mo, setMo] = useState(true)
    // mag + phase second
    const [magnitudeSecondURL, setMagnitudeSecondURL] = useState()
    const [phaseSecondURL, setphaseSecondURL] = useState()
    const [magSecondCrop, setMagSecondCrop] = useState()
    const [phaseSecondCrop, setPhaseSecondCrop] = useState()
	
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
            mo,
            setMo
            }}>
			{children}
		</FileContext.Provider>
	);
};

export { FileContext, FileContextProvider };