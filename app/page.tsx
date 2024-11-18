

"use client"
import ConnectWalletBtn from "@/components/ConnectWalletBtn";
import ConnectWalletUI from "@/components/ConnectWalletUI";
import useLottery from "@/hooks/useLottery";
import { abi, address } from "@/utils/lottery";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const { web3, contract } = useLottery()
  const [manager, setManager] = useState(null)
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState<number>(0)

  const [ether, setEther] = useState("")
  const [message, setMessage] = useState("")
  const [accounts, setAccounts] = useState<string>("")

  useEffect(() => {

    if (contract && web3) {
      const fetch = async () => {
        try {
          const [m, player, accountBalance, userAccount] = await Promise.allSettled([contract.methods.manager().call(), contract.methods.returnEntries().call(), web3.eth.getBalance(contract.options.address!), web3.eth.getAccounts()])

          if (m.status === "fulfilled" && player.status === "fulfilled" && accountBalance.status === "fulfilled" && userAccount.status === "fulfilled") {
            console.log(userAccount.value);

            setAccounts(userAccount.value[0])
            setPlayers(player.value)

            // @ts-expect-error: Type error
            setBalance(accountBalance.value)

            if (typeof m.value === "string") {
              // @ts-expect-error: Type error

              setManager(m.value)
            }
          }


        } catch (error) {
          console.error("Error fetching manager:", error);
        }
      }

      fetch()
    }
  }, [contract, web3])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!web3) {
      return
    }

    if (!ether) {
      alert("Please some value")
      return
    }


    const accounts = await web3!.eth.getAccounts()

    setMessage("Waiting on transaction success...")

    try {
      await contract.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(ether, "ether")
      })

      setMessage("Transaction successful, you have been entered into the lottery")
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message.split(":")[2])
      }
    }
  }

  const pickAWinner = async () => {
    if (web3) {
      const accounts = await web3.eth.getAccounts()
      const lottery = new web3.eth.Contract(abi, address)
      try {
        await lottery.methods.pickRandomWinner().send({
          from: accounts[0],
        })

        setMessage("A winner has been picked")
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
      <ConnectWalletUI />
    </div>
  );
}
