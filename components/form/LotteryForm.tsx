"use client"
import React, { FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import Web3 from 'web3'
import { abi, address } from '@/utils/lottery'

const LotteryForm = () => {

    const [amount, setAmount] = useState<string>(".01")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, address);

        if (!web3) {
            return
        }

        if (!amount) {
            alert("Please enter some value")
            return
        }

        setIsLoading(true)
        const accounts = await web3.eth.getAccounts()


        try {
            await contract.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei(amount, "ether")
            })

            alert("Transaction successful, you have been entered into the lottery")
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message.split(":")[2])
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className='space-y-3' onSubmit={handleSubmit}>
            <div className='space-y-2'>
                <label className='tracking-tight text-white'>Enter amount</label>
                <input type='number' className='w-full bg-white py-2 px-3 rounded-md border-none outline-none' value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <Button variant={"ghost"} size={"lg"} className=' bg-gradient-to-r transition-all hover:from-violet-500 hover:to-pink-500 duration-700 from-pink-500 to-violet-500 w-full rounded-full text-white hover:text-white'>{isLoading ? "Entering the lottery" : "Enter"}</Button>
        </form>
    )
}

export default LotteryForm