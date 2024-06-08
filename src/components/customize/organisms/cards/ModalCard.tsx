import useClickOutsideElement from "@/hooks/useClickOutsideElement";
import React from "react";
import Button from "../../atoms/button/Button";

type IProps = {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  buttonText?: string;
  deleteTitle?: string;
  onClick?: () => void;
  onDelete?: () => void;
};

function ModalCard({
  children,
  open,
  setOpen,
  title,
  buttonText,
  deleteTitle,
  onClick,
  onDelete,
}: IProps) {
  const modalRef = useClickOutsideElement(setOpen);

  return (
    <div
      className={`${
        open ? "visible bg-black/30" : "invisible"
      } fixed inset-0 backdrop-blur-lg flex items-center justify-center transition-colors z-30`}
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

        {deleteTitle && (
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold flex">
              Are you sure want to delete {deleteTitle}?
            </p>

            <p className="text-sm font-medium text-slate-500">
              This will permanently remove the data from our servers.
            </p>

            <div className="flex gap-2 justify-end">
              <Button
                text="Batal"
                btnStyle="outlined"
                additionClassname="w-full"
                onClick={() => setOpen(false)}
              />
              <Button
                text="Hapus"
                btnStyle="filled"
                additionClassname="w-full"
                onClick={onDelete}
              />
            </div>
          </div>
        )}

        {children}

        {buttonText && (
          <div className="flex gap-2 justify-end">
            <Button
              text="Batal"
              btnStyle="outlined"
              additionClassname="w-full"
              onClick={() => setOpen(false)}
            />
            <Button
              text={buttonText}
              btnStyle="filled"
              additionClassname="w-full"
              onClick={onClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalCard;
