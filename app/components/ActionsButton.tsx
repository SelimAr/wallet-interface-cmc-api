import React from "react";

interface ActionsBtn {
  name: string;
  icon: any;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ActionsButton(props: ActionsBtn) {
  const { name, icon, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="bg-black/50 text-white font-arimo rounded-lg p-3 cursor-pointer w-full hover:bg-black/60 flex items-center justify-center"
    >
      {name} <span className="mx-1"></span> {icon}
    </button>
  );
}
