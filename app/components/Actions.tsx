"use client";
import React, { useState } from "react";
import ActionsButton from "./ActionsButton";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import { HandCoins, Handshake } from "lucide-react";

export default function Actions() {
  const [depositIsOpen, setDepositIsOpen] = useState(false);
  const [withdrawIsOpen, setWithdrawIsOpen] = useState(false);
  return (
    <>
      <div className="h-fit w-full flex items-center space-x-2 my-2 rounded-xl ">
        <ActionsButton
          onClick={() => setDepositIsOpen(true)}
          name="Dépôts"
          icon={<HandCoins />}
        />
        <ActionsButton
          onClick={() => setWithdrawIsOpen(true)}
          name="Retraits"
          icon={<Handshake />}
        />
      </div>
      {depositIsOpen === true && (
        <DepositModal onClose={() => setDepositIsOpen(false)} />
      )}
      {withdrawIsOpen === true && (
        <WithdrawModal onClose={() => setWithdrawIsOpen(false)} />
      )}
    </>
  );
}
