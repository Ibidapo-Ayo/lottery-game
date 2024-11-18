"use client"
import React, { useEffect, useState } from 'react'

const LotteryEndTimer = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - Date.now()
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                })
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }
        const timerId = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timerId);
    }, [targetDate])
    return (
        <div className='flex space-x-2 items-center px-4 py-3'>
            {Object.entries(timeLeft).map(([label, value], index) => (
                <div key={index} className='flex items-center space-x-2'>
                    {label === "seconds" && <span className="text-md font-bold">:</span>}
                    <div key={label} className='w-12 h-8 rounded-md bg-gradient-to-r from-violet-500 to-pink-500 flex justify-center items-center'>
                        <span className="text-md font-bold text-white text-center tracking-tight">{value}</span>
                        <span className="text-md font-bold text-white text-center tracking-tight">{label[0]}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LotteryEndTimer