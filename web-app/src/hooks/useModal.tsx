import { useState } from "react";

export default function useModal() {
  const [isModalOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isModalOpen);
  };

  return {
    isModalOpen,
    toggle
  };
}
