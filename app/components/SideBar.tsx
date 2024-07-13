"use client";

import React, { useState } from "react";
import Image from "next/image";
import Profil from "../../public/profil.jpg";
import {
  CircleUser,
  ArrowRightLeft,
  Bot,
  Store,
  Settings,
  LogOut,
  Plus,
  PlugZap,
  CandlestickChart,
  ArrowLeftToLine,
  ArrowRightToLine,
} from "lucide-react";

export default function Sidebard() {
  const [isConnected, setIsConnected] = useState(true);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const [integrationIsOpen, setIntegrationIsOpen] = useState(false);
  const [investmentIsOpen, setInvestmentIsOpen] = useState(false);
  const menu = [
    { id: "1", name: "Mon compte", icon: <CircleUser size={23} /> },
    { id: "2", name: "Transactions", icon: <ArrowRightLeft size={23} /> },
    { id: "3", name: "Automatisations", icon: <Bot size={23} /> },
    { id: "4", name: "Marketplace", icon: <Store size={23} /> },
    { id: "4", name: "Paramètres", icon: <Settings size={23} /> },
  ];
  return (
    <div
      className={`${
        !sidebarIsOpen ? "w-20 min-w-20" : "w-full max-w-xs"
      } bg-black/50 rounded-xl h-[calc(100vh-40px)] text-white p-3 relative overflow-y-auto font-arimo`}
    >
      <div className="flex items-center w-full space-x-2 cursor-pointer">
        <div className="block">
          <Image
            src={Profil}
            alt="user"
            className={`${
              !sidebarIsOpen ? "w-9 h-9 mt-3" : "w-14 h-14"
            } rounded-full`}
            width={100}
            height={300}
          />
        </div>
        <div className="block">
          <p className="">{sidebarIsOpen && "Selim M."}</p>
          <div className="flex items-baseline space-x-1 relative">
            <p className="">{sidebarIsOpen && "Actuellement connecté"}</p>
            <span
              className={`${isConnected ? "bg-green-500" : "bg-red-500"} ${
                !sidebarIsOpen && "absolute translate-y-3 -translate-x-3"
              } w-2.5 h-2.5 rounded-full`}
            ></span>
          </div>
        </div>
        <button
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          className={`${
            !sidebarIsOpen ? "right-2 top-2" : "right-3 top-3"
          }  absolute`}
        >
          {sidebarIsOpen ? <ArrowLeftToLine /> : <ArrowRightToLine size={20} />}
        </button>
      </div>
      <div className="block mt-5">
        {menu.map((item) => (
          <li
            key={item.id}
            className={`${
              !sidebarIsOpen && "my-2 justify-center p-1"
            } flex items-center list-none bg-black/20 p-2 my-4 rounded-xl cursor-pointer hover:bg-white/10`}
          >
            {item.icon}
            <span className={`${!sidebarIsOpen ? "mx-0" : "mx-1"}`}></span>
            {sidebarIsOpen && item.name}
          </li>
        ))}
      </div>
      <div className="block space-y-4 mt-10">
        <div className="bg-black/20 rounded-xl p-2 block space-y-2">
          <p
            onClick={() => setIntegrationIsOpen(!integrationIsOpen)}
            className={`${
              !sidebarIsOpen ? "justify-center cursor-pointer" : null
            } text-white flex`}
          >
            <PlugZap
              size={23}
              className={`${!sidebarIsOpen ? "mr-0" : "mr-2"}`}
            />{" "}
            {sidebarIsOpen && "Intégrations"}
          </p>
          <div
            className={`${integrationIsOpen && "hidden"} ${
              !sidebarIsOpen
                ? "block space-y-3 mx-auto w-fit "
                : " flex justify-start space-x-3"
            }`}
          >
            <img
              src="https://s2.coinmarketcap.com/static/cloud/img/banners/cmc.png"
              alt="coinmarketcap"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <img
              src="https://cryptoast.fr/wp-content/themes/cryptoast3/icons/cryptoast-logo.svg"
              alt="cryptoast"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <img
              src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png"
              alt="binance"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <div className="bg-black/20 rounded-full text-center flex justify-center items-center cursor-pointer hover:bg-white/10">
              <Plus size={33} />
            </div>
          </div>
        </div>
        <div className="bg-black/20 rounded-xl p-2 block space-y-2">
          <p
            onClick={() => setInvestmentIsOpen(!investmentIsOpen)}
            className={`${
              !sidebarIsOpen ? "justify-center cursor-pointer" : null
            } text-white flex`}
          >
            <CandlestickChart
              size={23}
              className={`${!sidebarIsOpen ? "mr-0" : "mr-2"}`}
            />
            {sidebarIsOpen && "Investissements"}
          </p>
          <div
            className={`${investmentIsOpen && "hidden"} ${
              sidebarIsOpen
                ? "flex justify-center space-x-2"
                : "block space-y-2"
            }`}
          >
            <div
              className={`${
                !sidebarIsOpen ? "justify-center" : null
              } flex space-x-1 items-center bg-white/10 p-1 rounded-xl cursor-pointer`}
            >
              {sidebarIsOpen && <p>1,6254 rETH</p>}
              <img
                src="https://cdn.prod.website-files.com/64053c5d931f167ecf5997be/6405771ffb64702144b3da4a_el-logo.png"
                alt="eigenlayer"
                className="w-6 h-6 rounded-full cursor-pointer"
              />
            </div>
            <div
              className={`${
                !sidebarIsOpen ? "justify-center" : null
              } flex space-x-1 items-center bg-white/10 p-1 rounded-xl cursor-pointer`}
            >
              {sidebarIsOpen && <p>4,0241 stETH</p>}
              <img
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/8000.png"
                alt="lido"
                className="w-6 h-6 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex justify-center items-center">
          <div className=" rounded-full border-2 w-fit h-fit text-center cursor-pointer hover:bg-black/20">
            <Plus size={sidebarIsOpen ? 55 : 35} />
          </div>
        </div>
      </div>

      <div
        className={`${
          !sidebarIsOpen ? "static mt-2" : "absolute"
        } block bottom-3 z-30`}
      >
        <p
          onClick={() => setIsConnected(!isConnected)}
          className={`${
            !sidebarIsOpen ? "justify-center" : null
          } flex items-center p-2 cursor-pointer`}
        >
          <LogOut size={23} />
          <span className={`${!sidebarIsOpen ? "mx-0" : "mx-1"}`}></span>
          {sidebarIsOpen ? (isConnected ? "Déconnexion" : "Connexion") : null}
        </p>
      </div>
    </div>
  );
}
