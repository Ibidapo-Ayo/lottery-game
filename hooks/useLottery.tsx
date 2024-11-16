"use client"
import { abi, address } from '@/utils/lottery';
import React, { useEffect, useState } from 'react'
import Web3 from 'web3';

const useLottery = () => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.ethereum) {

            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(() => {
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    const contractInstance = new web3Instance.eth.Contract(abi, address);
                    setContract(contractInstance)
                })
        }
    }, [])
    return { web3, contract }
}

export default useLottery