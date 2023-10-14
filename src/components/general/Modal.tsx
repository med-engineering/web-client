import { CSSProperties, FC, ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence, MotionStyle } from "framer-motion";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  label: string;
  children?: ReactNode;
  maxWidth?: string;
  modalStyle?: CSSProperties;
  onRequestClose: () => void;
  useFooter?: boolean;
  isConfirmation?: boolean | undefined;
  confirmationDialogue?: string;
  confirmationButtonColor?: "primary" | "secondary" | "danger";
  confirmationButtonTitle?: string;
  confirmationButtonLoading?: boolean;
  onConfirm?: () => void;
}

const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  label,
  maxWidth,
  modalStyle,
  onRequestClose,
  useFooter,
  isConfirmation,
  confirmationDialogue,
  confirmationButtonColor = "primary",
  confirmationButtonTitle,
  confirmationButtonLoading,
  onConfirm,
}) => {
  useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    };
    document.addEventListener("keydown", handleEscPress);

    return () => {
      document.removeEventListener("keydown", handleEscPress);
    };
  }, []);

  const modalType = isConfirmation ? "confirmation" : "default";

  const [rootElement, setRootElement] = useState<any>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.getElementById("root");
    setRootElement(root);
  }, []);

  if (!rootElement) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-dark-2 relative"
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              y: 40,
            }}
            transition={{
              duration: 0.1,
            }}
            style={{
              ...ModalStyles[modalType].modal,
              maxWidth: maxWidth
                ? maxWidth
                : ModalStyles[modalType].modal.maxWidth,
              ...modalStyle,
            }}
          >
            <div
              className="py-5 border-b border-gray-500"
              style={{ borderBottomStyle: "solid" }}
            >
              <div className="flex justify-between items-center w-full px-6">
                <p className="text-[21px] text-gray-300 font-semibold text-center capitalize">
                  {label}
                </p>
                <button
                  className="w-[40px] h-[40px] hover:bg-gray-800 flex items-center justify-center duration-200 rounded-[4px]"
                  onClick={onRequestClose}
                >
                  <FontAwesomeIcon icon={faClose} fontSize={23} />
                </button>
              </div>
            </div>
            {isConfirmation ? (
              <>
                <div className="py-3 px-4 break-words">
                  {confirmationDialogue}
                </div>
                <div className="mt-1 flex items-center justify-end py-4">
                  <Button color="secondary" onClick={onRequestClose}>
                    Never Mind
                  </Button>
                  <Button
                    className="ml-4"
                    color={confirmationButtonColor}
                    isLoading={confirmationButtonLoading}
                    onClick={onConfirm}
                  >
                    {confirmationButtonTitle}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="py-2 max-h-[70vh] relative overflow-y-auto">
                  {children}
                </div>
                {useFooter && (
                  <div
                    style={{ borderTopStyle: "solid" }}
                    className=" border-t border-gray-500 flex justify-start items-center shadow-xl bg-dark-2 w-full h-[100px] px-6"
                  >
                    <Button
                      isLoading={confirmationButtonLoading}
                      onClick={onConfirm}
                      color={confirmationButtonColor}
                    >
                      {confirmationButtonTitle}
                    </Button>
                    <Button
                      onClick={onRequestClose}
                      color="secondary"
                      className="ml-4"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={onRequestClose}
            style={{
              ...ModalStyles[modalType].overlay,
              pointerEvents: isOpen ? "auto" : "none",
            }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.1,
            }}
          ></motion.div>
        )}
      </AnimatePresence>
    </>,
    rootElement // Render in the root element
  );
};

const ModalStyles = {
  confirmation: {
    modal: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      margin: "auto",
      width: "95%",
      maxWidth: "500px",
      minHeight: "100px",
      height: "max-content",
      maxHeight: "700px",
      padding: "0 15px",
      borderRadius: "9px",
      overflow: "hidden",
      border: "none",
      zIndex: 1001,
    } as MotionStyle,
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.4)",
      zIndex: 1000,
    } as MotionStyle,
  },
  default: {
    modal: {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      margin: "auto",
      position: "absolute",
      width: "95%",
      maxWidth: "900px",
      minHeight: "200px",
      height: "max-content",
      maxHeight: "700px",
      padding: "0",
      borderRadius: "9px",
      overflow: "hidden",
      border: "none",
      zIndex: 1001,
    } as MotionStyle,
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.4)",
      zIndex: 1000,
    } as MotionStyle,
  },
};

export { Modal };
