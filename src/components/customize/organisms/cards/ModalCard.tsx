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
  maxWidth?: string;
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
  maxWidth,
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
        className={`${open ? "scale-100 opacity-100" : "scale-90 opacity-0"} ${
          maxWidth ? maxWidth : "max-w-md"
        } p-6 bg-white rounded-md w-full transition-all`}
      >
        {title && (
          <p className="text-2xl font-semibold mb-4 flex justify-center">
            {title}
          </p>
        )}

        {deleteTitle && (
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold flex">
              Anda yakin menghapus {deleteTitle}?
            </p>

            <p className="text-sm font-medium text-slate-500">
              Aksi ini akan menghapus data Anda secara permanen dan tidak bisa
              dikembalikan.
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
