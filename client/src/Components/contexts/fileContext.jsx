import React, { createContext, useState } from 'react';
const FileContext = createContext();

const FileContextProvider = ({ children }) => {
    const [selectOriginalFirst , setSelectOriginalFirst] = useState(false);
    const [selectOriginalSecond , setSelectOriginalSecond] = useState(false);
    const [originalFirstURL, setOriginalFirstURL] = useState()
    const [phaseFirstURL, setphaseFirstURL] = useState()
    const [magnitudeFirstURL, setMagnitudeFirstURL] = useState()
    const [originalSecondURL, setOriginalSecondURL] = useState()
    const [phaseSecondURL, setphaseSecondURL] = useState()
    const [magnitudeSecondURL, setMagnitudeSecondURL] = useState()
    const [firstCrop, setFirstCrop] = useState({
        unit: '%', // Can be 'px' or '%'
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })
    const [firstFile,setFirstFile] = useState();
    const [secondCrop, setSecondCrop] = useState({
        unit: '%', // Can be 'px' or '%'
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })
    const [secondFile,setSecondFile] = useState();
	
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
            selectOriginalFirst,
            setSelectOriginalFirst,
            selectOriginalSecond,
            setSelectOriginalSecond,
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
            setMagnitudeSecondURL
            }}>
			{children}
		</FileContext.Provider>
	);
};

export { FileContext, FileContextProvider };