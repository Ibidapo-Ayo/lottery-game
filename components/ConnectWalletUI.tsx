import React from 'react'
import ConnectWalletBtn from './ConnectWalletBtn'

const ConnectWalletUI = () => {
    return (
        <div className=" flex flex-col md:flex-row justify-between items-center gap-20">
            <div className="w-full md:w-1/3">
                <div className="border border-amber-500 rounded-md w-96 px-5 py-2 h-60 flex flex-col justify-center space-y-5">
                    <h1 className="font-bold text-white text-2xl ">Connect your wallet to join the <span className="bg-clip-text  bg-gradient-to-r from-pink-500 to-violet-500 text-transparent">lottery</span></h1>
                    <ConnectWalletBtn />
                </div>
            </div>
            <div className="w-full flex flex-col justify-center space-y-5">
                <div className="space-y-2">
                    <h2 className="text-xl bg-clip-text text-center md:text-end  bg-gradient-to-r from-pink-500 to-violet-500 text-transparent font-bold tracking-tight">Participants:</h2>
                    <h1 className="text-5xl font-bold text-white text-center md:text-end tracking-tight">100</h1>
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl bg-clip-text text-center md:text-end  bg-gradient-to-r from-pink-500 to-violet-500 text-transparent font-bold tracking-tight">Join the Lottery to stand a chance to win</h2>
                    <h1 className="text-7xl font-bold text-white text-center md:text-end tracking-tight">20 ether</h1>
                </div>
            </div>
        </div>
    )
}

export default ConnectWalletUI