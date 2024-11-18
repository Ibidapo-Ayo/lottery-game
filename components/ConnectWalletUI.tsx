
import React from 'react'
import ConnectWalletBtn from './ConnectWalletBtn'

const ConnectWalletUI = () => {
    return (
        <div className="w-full md:w-1/3">
            <div className="border border-amber-500 rounded-md w-96 px-5 py-2 h-60 flex flex-col justify-center space-y-5">
                <h1 className="font-bold text-white text-2xl ">Connect your wallet to join the <span className="">lottery</span></h1>
                <ConnectWalletBtn />
            </div>
        </div>
    )
}

export default ConnectWalletUI