import React, { useEffect, useState } from "react";
import styles from "../style/MessageModal.module.css";
import { Day } from "../types";
import { RiDeleteBin5Line } from "react-icons/ri";

interface MessageModalProps {
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onSave: (e: React.MouseEvent, currMessage: string) => void;
  day: Day | undefined;
}

const MessageModal: React.FC<MessageModalProps> = ({
  onClose,
  day,
  onSave,
}) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [currMsgLen, setCurrMsgLen] = useState(0);

  useEffect(() => {
    if (day?.message !== undefined && day.message !== null) {
      setCurrentMsg(day.message);
    }
  }, []);

  useEffect(() => setCurrMsgLen(currentMsg.length), [currentMsg]);
  return (
    <>
      <div className={styles.modalBackground}></div>
      <div className={styles.modalFront}>
        <div className={styles.modalBodyContainer}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Nauja Žinutė</h2>
            <RiDeleteBin5Line
              onClick={(e) => onSave(e, "")}
              className={styles.modalDeleteIcon}
              size="25"
            />
          </div>
          <textarea
            className={styles.modalInput}
            placeholder="Žinutė"
            name="message"
            value={currentMsg}
            onChange={(e) => setCurrentMsg(e.target.value)}
          ></textarea>
          <div className={styles.wordCount}>{`${currMsgLen}/1000`}</div>
          <div className={styles.modalBtnContainer}>
            <button className={styles.closeBtn} onClick={onClose}>
              Atšaukti
            </button>
            <button
              className={styles.saveBtn}
              onClick={(e) => onSave(e, currentMsg)}
            >
              Išsaugoti
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageModal;
