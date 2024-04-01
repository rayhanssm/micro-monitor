import useClickOutsideElement from "@/hooks/useClickOutsideElement";
import React from "react";
import Button from "../../atoms/button/Button";

type IProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  buttonText?: string;
};

function ModalCard({ children, open, setOpen, title, buttonText }: IProps) {
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
        {title && (
          <p className="text-2xl font-semibold mb-4 flex justify-center">
            {title}
          </p>
        )}

        {children}

        {buttonText && (
          <div className="flex gap-2 justify-end">
            <Button
              text="Cancel"
              type="outlined"
              additionClassname="w-full"
              onClick={() => setOpen(false)}
            />
            <Button
              text={buttonText}
              type="filled"
              additionClassname="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalCard;
