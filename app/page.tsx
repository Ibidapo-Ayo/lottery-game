

"use client"
import lottery from "@/utils/lottery";
import { useEffect, useState } from "react";

export default function Home() {

  const [manager, setManager] = useState(null)

  useEffect(() => {

    const fetch = async () => {
      try {
        const m = await lottery.methods.manager().call()
        const players = await lottery.methods.returnEntries().call()
        console.log(players);
        if (typeof m === "string") {
          setManager(m)
        }

      } catch (error) {
        console.error("Error fetching manager:", error);
      }
    }

    fetch()
  }, [])

  return (
    <div className="w-full h-screen pt-10">
      <h1 className="text-2xl text-center font-semibold">Welcome to the Lottery Game </h1>
      {manager && <p className="text-sm text-gray-500 text-center">This contract was deployed by {manager}</p>}
    </div>
  );
}
