import { useEffect, useRef } from "react";

function useClickOutsideElement(callback: (value: boolean) => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        callback(false);
      }
    };

    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [callback]);

  return ref;
}

export default useClickOutsideElement;
