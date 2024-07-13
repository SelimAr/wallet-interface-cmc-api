import React from "react";
import Wallet from "./Wallet";
import Actions from "./Actions";
import CryptoList from "./CryptoList";

const URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100";

const Options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-CMC_PRO_API_KEY": `${process.env.CMC_PRO_API_KEY}`,
  },
};

async function fetchData() {
  const res = await fetch(URL, Options);
  return res.json();
}

export default async function Container() {
  const getData = await fetchData();
  console.log(getData);

  return (
    <div className="block w-full">
      <Wallet />
      <Actions />
      <CryptoList data={getData.data} />
    </div>
  );
}
