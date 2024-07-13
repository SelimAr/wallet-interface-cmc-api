import React from "react";
import { CircleX } from "lucide-react";

interface DepositModal {
  onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function WithdrawModal(props: DepositModal) {
  const { onClose } = props;
  return (
    <div className="fixed z-30 inset-0 m-auto w-full h-full bg-black/20 backdrop-blur">
      <div className="bg-black/50 absolute m-auto z-40 inset-0 w-60 h-60 rounded-lg font-arimo text-white p-2">
        <button onClick={onClose} className="float-right">
          <CircleX size={30} />
        </button>
        <div className="absolute inset-0 m-auto w-fit h-fit -rotate-45">
          Upcoming !
        </div>
      </div>
    </div>
  );
}
