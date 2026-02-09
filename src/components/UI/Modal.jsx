import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal({
  children,
  show,
  onClose,
  className = "",
}) {
  const modalRef = useRef();

  useEffect(() => {
    const modal = modalRef.current
    if (show) {
      modal.showModal();
    }
    return () => modal.close();
  }, [show]);

  return createPortal(
    <dialog ref={modalRef} onClose={onClose} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
