

"use client"
import lottery from "@/utils/lottery";
import web3 from "@/utils/web3";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {

  const [manager, setManager] = useState(null)
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState<number>(0)

  const [ether, setEther] = useState("")
  const [message, setMessage] = useState("")
  const [accounts, setAccounts] = useState<string>("")

  useEffect(() => {

    const fetch = async () => {
      try {
        const [m, player, accountBalance, userAccount] = await Promise.allSettled([lottery.methods.manager().call(), lottery.methods.returnEntries().call(), web3.eth.getBalance(lottery.options.address!), web3.eth.getAccounts()])

        if (m.status === "fulfilled" && player.status === "fulfilled" && accountBalance.status === "fulfilled" && userAccount.status === "fulfilled") {

          setAccounts(userAccount.value[0])
          
          // @ts-expect-error
          setPlayers(player.value)

          // @ts-expect-error
          setBalance(accountBalance.value)

          if (typeof m.value === "string") {
            setManager(m.value)
          }
        }


      } catch (error) {
        console.error("Error fetching manager:", error);
      }
    }

    fetch()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!ether) {
      alert("Please some value")
      return
    }


    const accounts = await web3.eth.getAccounts()

    setMessage("Waiting on transaction success...")

    try {

      await lottery.methods.enter().send({
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
    const accounts = await web3.eth.getAccounts()

    try {
      await lottery.methods.pickRandomWinner().send({
        from: accounts[0],
      })

      setMessage("A winner has been picked")
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="w-full h-screen pt-10">
      <h1 className="text-2xl font-semibold">Welcome to the Lottery Game </h1>
      {manager && <p className="text-sm text-gray-500">This contract was deployed by {manager}</p>}

      <p className="text-gray-500">There are currently  {players.length} people entered, competing to win {web3.utils.fromWei(balance!, "ether")} ether</p>

      <div className="pt-10">
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <h4>Want to try your luck?</h4>
          <div className="flex flex-col space-y-2">
            <label>Amount of ether  to enter</label>
            <input className="bg-gray-100 p-3 rounded-md border-none hover:border-none outline-none hover:outline-none " type="text" value={ether} onChange={(e) => setEther(e.target.value)} />
          </div>

          <button className="bg-amber-500 font-medium px-5 py-2 rounded-md" type="submit">Enter</button>

        </form>


        {manager === accounts && (
          <div className="space-y-3 pt-10">
            <h3>You are the manager, then you can pick a winner</h3>
            <button className="bg-amber-500 font-medium px-5 py-2 rounded-md" type="button" onClick={pickAWinner}>Pick a winner</button>
          </div>
        )}

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
