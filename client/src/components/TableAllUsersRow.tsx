import React from "react";
import styles from "../style/TableAllUsersRow.module.css";
import { RiDeleteBin5Line } from "react-icons/ri";

interface TableAllUsersRowProps {
  id: string;
  username: string;
  role: string | undefined;
  onDelete: (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: string,
    username: string
  ) => void;
}

const TableAllUsersRow: React.FC<TableAllUsersRowProps> = ({
  username,
  role,
  id,
  onDelete,
}) => {
  return (
    <tr>
      <td className={styles.userName}>
        <div>{username}</div>
      </td>
      <td className={styles.userRole}>
        {role === "admin" ? "Administratorius" : "Vartotojas"}
      </td>
      <td className={styles.binField}>
        <RiDeleteBin5Line
          onClick={(e) => onDelete(e, id, username)}
          className={styles.bin}
          size="20"
        />
      </td>
    </tr>
  );
};

export default TableAllUsersRow;
