"use client";

import { createContext, ReactNode, useState } from "react";

import { Window } from "./window";
import { Open } from "./open";

interface ModalContextType {
  openModal: string;
  open: (value: string) => void;
  close: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  openModal: "",
  open: () => {},
  close: () => {},
});

function Modal({
  children,
  compulsion,
  compulsionAction,
}: {
  children: ReactNode;
  compulsion?: boolean;
  compulsionAction?: () => void;
}) {
  const [openModal, setOpenModal] = useState("");

  const open = setOpenModal;
  const close = compulsion
    ? () => {
        compulsionAction ? compulsionAction() : null;
      }
    : () => setOpenModal("");

  return (
    <ModalContext.Provider value={{ openModal, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
