import React, { ReactChild } from "react";
import styles from "../style/InputWindow.module.css";

interface InputWindowProps {
  children?: ReactChild;
  title: string;
}

const InputWindow: React.FC<InputWindowProps> = ({ children, title }) => {
  return (
    <div className={styles.window}>
      <div className={styles.contentContainer}>
        <div className={styles.windowTitle}>{title}</div>
        {children}
      </div>
    </div>
  );
};

export default InputWindow;
