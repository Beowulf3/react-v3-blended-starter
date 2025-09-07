import { useEffect, type ReactNode } from "react";
import styled from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode,
  onClose: () => void,
}

export default function Modal({ children, onClose }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
  }, [onClose])
  
  return createPortal(
    <div className={styled.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className={styled.modal}>
        <button onClick={onClose} className={styled.closeButton} aria-label="Close modal">
          &times;
        </button>
        {children }
      </div>
    </div>,
    document.body
  );
}
