
import React from 'react'
import LotteryForm from './form/LotteryForm'

const EnterLottery = () => {
    return (
        <div className="w-full md:w-1/3">
            <div className="border border-amber-500 rounded-md w-96 px-5 py-2 h-60 flex flex-col justify-center space-y-5">
                <h1 className="font-bold text-white text-2xl ">Enter <span className="">Lottery</span></h1>
               <LotteryForm />
            </div>
        </div>
    )
}

export default EnterLottery