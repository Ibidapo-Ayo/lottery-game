"use client"
import { abi, address } from '@/utils/lottery'
import React, { createContext, useEffect, useState } from 'react'
import Web3 from 'web3'
type LotteryContextProps = {
  auth: [string | null, React.Dispatch<React.SetStateAction<string | null>>],
  web3: Web3 | null,
  contract: any
}
export const LotteryContext = createContext<LotteryContextProps>({
  auth: ["false", () => ""],
  web3: null,
  contract: null
})


const LotteryContextProvider = (

  { children }:
    Readonly<{
      children: React.ReactNode;
    }>

) => {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [contract, setContract] = useState<any>(null)

  const [userIsLoggedin, setUserIsLoggedIn] = useState<string | null>("")

  useEffect(() => {

    if (userIsLoggedin === "false" || !userIsLoggedin) {
      if (typeof window !== "undefined") {
        setUserIsLoggedIn(sessionStorage.getItem("userIsSignedIn"))
      }
    }

    if (userIsLoggedin === "true") {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance)
      const contractInstance = new web3Instance.eth.Contract(abi, address)
      setContract(contractInstance)
    }
  }, [userIsLoggedin])
  return (
    <LotteryContext.Provider value={{ auth: [userIsLoggedin, setUserIsLoggedIn], web3, contract }}>{children}</LotteryContext.Provider>
  )
}

export default LotteryContextProvider