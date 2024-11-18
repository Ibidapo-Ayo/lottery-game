

"use client"
import ConnectWalletUI from "@/components/ConnectWalletUI";
import EnterLottery from "@/components/EnterLottery";
import Lottery from "@/components/Lottery";
import LotteryEndTimer from "@/components/LotteryEndTimer";
import { Button } from "@/components/ui/button";
import { LotteryContext } from "@/hooks/LotteryContext";
import { lotterEndTime } from "@/lib/utils";
import Link from "next/link";
import { useContext, useState } from "react";

export default function Home() {
  const { auth, web3, contract } = useContext(LotteryContext)

  const [userIsLoggedin, _] = auth
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false)





  const pickAWinner = async () => {
    if (web3) {
      const accounts = await web3.eth.getAccounts()
      try {
        await contract.methods.pickRandomWinner().send({
          from: accounts[0],
        })

        alert("A winner has been picked!")
      } catch (error) {
        console.log(error);

      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto md:pt-20 pt-10 z-20 md:px-0 px-5 space-y-6">
      <div>
        <p className="text-white tracking-tight text-sm">Contract address: <Link href="https://sepolia.etherscan.io/address/0xfcbD2274f7c23Add5E54b5750602b6dD0946Ef01" target="_blank" className="underline">0xfcbD2274f7c23Add5E54b5750602b6dD0946Ef01</Link></p>
      </div>

      <div className=" flex flex-col md:flex-row justify-between items-center gap-20">
        {userIsLoggedin === "true" ? <EnterLottery /> : <ConnectWalletUI />}

        {userIsLoggedin === "true" && <Lottery setUserIsAdmin={setUserIsAdmin} />}
      </div>

      <div className="">
        <h1 className="text-xl text-white tracking-tight font-semibold">Lottery will end in:</h1>
        <LotteryEndTimer targetDate='2024-11-18T09:28:25.195Z' />
      </div>

      {userIsAdmin && (
        <div className="pt-10">
          <Button variant={"ghost"} size={"lg"} className='rounded-full  bg-gradient-to-r from-pink-500 to-violet-500' onClick={pickAWinner} disabled={lotterEndTime > String(Date.now())}>Pick a winner</Button>
        </div>
      )}
    </div>
  );
}
