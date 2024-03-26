import { useEffect, useRef } from "react";

type IProps = {
  setIsOpen: (value: boolean) => void;
};

function useClickOutsideElement({ setIsOpen }: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [setIsOpen]);

  return ref;
}

export default useClickOutsideElement;
