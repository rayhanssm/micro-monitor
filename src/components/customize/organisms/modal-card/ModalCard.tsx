import useClickOutsideElement from "@/hooks/useClickOutsideElement";
import React from "react";

type IProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
};

function ModalCard({ children, open, setOpen }: IProps) {
  const modalRef = useClickOutsideElement(setOpen);

  return (
    <div
      className={`${
        open ? "visible bg-black/30" : "invisible"
      } fixed inset-0 backdrop-blur-lg flex items-center justify-center transition-colors`}
    >
      <div
        ref={modalRef}
        className={`${
          open ? "scale-100 opacity-100" : "scale-90 opacity-0"
        } p-6 bg-white rounded-md max-w-md w-full transition-all`}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalCard;
