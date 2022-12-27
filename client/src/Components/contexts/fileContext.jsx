import React, { createContext, useState } from 'react';
const FileContext = createContext();

const FileContextProvider = ({ children }) => {
    const [selectOriginalFirst , setSelectOriginalFirst] = useState(false);
    const [selectOriginalSecond , setSelectOriginalSecond] = useState(false);
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
            setSelectOriginalSecond
            }}>
			{children}
		</FileContext.Provider>
	);
};

export { FileContext, FileContextProvider };