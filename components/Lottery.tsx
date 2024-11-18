"use client"
import { LotteryContext } from '@/hooks/LotteryContext'
import { address } from '@/utils/lottery'
import React, { useContext, useEffect, useState } from 'react'

type LotteryProps = {
    setUserIsAdmin: (v: boolean) => void
}

const Lottery = ({ setUserIsAdmin }: LotteryProps) => {
    const { auth, web3, contract } = useContext(LotteryContext)

    const [userIsLoggedin, _] = auth
    const [players, setPlayers] = useState([])
    const [balance, setBalance] = useState<number>(0)


    useEffect(() => {

        if (userIsLoggedin === "true" && contract && web3) {
            const fetch = async () => {
                try {

                    const [m, player, accountBalance, userAccount] = await Promise.allSettled([contract.methods.manager().call(), contract.methods.returnEntries().call(), web3?.eth.getBalance(address), web3?.eth.getAccounts()])

                    if (m.status === "fulfilled" && player.status === "fulfilled" && accountBalance.status === "fulfilled" && userAccount.status === "fulfilled") {
                        setUserIsAdmin(userAccount.value![0] === m.value)
                        setPlayers(player.value)

                        // @ts-expect-error: Type error
                        setBalance(accountBalance.value)
                    }

                } catch (error) {
                    console.error("Error fetching manager:", error);
                }
            }

            fetch()
        }
    }, [userIsLoggedin, web3, contract])

    return (
        <div className="w-full flex flex-col justify-center space-y-5">
            <div className="space-y-2">
                <h2 className="text-xl bg-clip-text text-center md:text-end text-white">Participants:</h2>
                <h1 className="text-5xl font-bold text-white text-center md:text-end tracking-tight">{players ? players.length : 0}</h1>
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl bg-clip-text text-center md:text-end text-white">Stand a chance to win</h2>
                <h1 className="text-7xl font-bold text-white text-center md:text-end tracking-tight">{web3?.utils.fromWei(balance!, "ether")} sepoliaEth</h1>
            </div>
        </div>
    )
}

export default Lottery