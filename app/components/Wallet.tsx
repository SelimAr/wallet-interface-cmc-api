import React from "react";
import { Copy, Plus } from "lucide-react";
import wallet from "../../data/wallet.json";

export default function Wallet() {
  return (
    <div className="bg-black/50 h-fit w-full rounded-xl text-white p-3 space-y-5">
      <div className="flex space-x-3 items-center">
        <p className="text-2xl w-fit font-orbitron">Wallet 0x84p3...67Q2</p>
        <Copy className="cursor-pointer" size={23} />
      </div>

      <div className="flex items-center flex-wrap">
        {wallet.map((data) => (
          <div
            key={data.id}
            className="block text-center bg-black/20 rounded-lg p-1.5 cursor-pointer w-full max-w-32 m-1.5 hover:bg-white/10"
          >
            <li className="list-none flex justify-center items-center font-orbitron">
              {data.name}{" "}
              <img
                className="w-6 h-6 ml-1 rounded-full"
                src={data.img}
                alt={data.symbol}
              />
            </li>
            <li className="list-none font-semibold font-arimo">
              {data.balance}
            </li>
          </div>
        ))}
        <div
          className="flex justify-center items-center bg-black/20 rounded-lg p-1.5 cursor-pointer w-28 max-w-28 h-[60px] m-1.5
        hover:bg-white/10"
        >
          <Plus size={40} />
        </div>
      </div>
    </div>
  );
}
