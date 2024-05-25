import React, { createContext, useEffect, useState } from "react"


export const Crypto = createContext();

const CryptoContext = ({children}) => {

   const [currency, setCurrency] = useState('INR')
   const [symbol, setSymbol] = useState('₹');

   useEffect(() => {
    currency === 'INR' ? setSymbol('₹') : setSymbol('$')
   }, [currency]);
console.log("useContext is running")

  return (
    <Crypto.Provider value={{currency, setCurrency,symbol}}>{children}</Crypto.Provider>
  )
}

export default CryptoContext