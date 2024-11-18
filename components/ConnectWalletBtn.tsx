"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { LotteryContext } from '@/hooks/LotteryContext'
import Link from 'next/link'
import { Copy } from 'lucide-react'

const ConnectWalletBtn = () => {
    const { auth, web3 } = useContext(LotteryContext)
    const [account, setAccount] = useState("")

    const [userIsLoggedin, setUserIsLoggedIn] = auth
    const connectWallet = () => {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
            sessionStorage.setItem("userIsSignedIn", "true")
            setUserIsLoggedIn("true")
        }).catch(() => {
            alert("User is not signed in")
        })
    }

    useEffect(() => {
        if (web3) {
            const fetchAccounts = async () => {
                const acc = await web3.eth.getAccounts()
                setAccount(acc[0])
            }

            fetchAccounts()
        }
    }, [web3])

    const handleCopy = () => {
        navigator.clipboard.writeText(account).then(function() {
            console.log("Text copied to clipboard!");
          }).catch(function(err) {
            console.error("Error copying text: ", err);
          });
    }

    return (userIsLoggedin === "true" ?
        <div className='flex items-center'>
            <p className='text-white truncate w-60'>Account connected: <Link href={`https://sepolia.etherscan.io/address/${account}`} target='_blank'>{account}</Link></p>

            <Button variant={"ghost"} size={"icon"} className='rounded-full hover:bg-gray-100 text-white hover:text-black' onClick={handleCopy}><Copy className='w-4' /></Button>
        </div>

        : <Button variant={"ghost"} size={"lg"} className='rounded-full  bg-gradient-to-r from-pink-500 to-violet-500' onClick={connectWallet}>Connect wallet</Button>)
}

export default ConnectWalletBtn