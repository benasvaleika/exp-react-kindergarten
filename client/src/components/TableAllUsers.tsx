import { useEffect, useState } from "react";
import styles from "../style/TableAllUsers.module.css";
import TableAllUsersRow from "./TableAllUsersRow";
import { User } from "../types";
import { generateAllTable } from "../utils/allTable";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "../constants";
import axios from "axios";

interface TableAllUsersProps {}

const TableAllUsers: React.FC<TableAllUsersProps> = ({}) => {
  const [users, setUsers] = useState<User[] | undefined>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<
    { id: string; username: string } | undefined
  >();

  const generateTable = async () => {
    const { successful, resultUsers } = await generateAllTable();
    if (successful && resultUsers) {
      setUsers(resultUsers);
    }
  };

  useEffect(() => {
    generateTable();
  }, []);

  const onDeleteConfirm = async () => {
    try {
      const deleteUser = await axios.post(
        API_URL + "/delete",
        {
          id: selectedUser?.id,
        },
        { withCredentials: true }
      );
      generateTable();
      setDeleteModalOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onDelete = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: string,
    username: string
  ) => {
    e.preventDefault();
    setSelectedUser({ id: id, username: username });
    setDeleteModalOpen(true);
  };

  const onModalClose = () => {
    setSelectedUser(undefined);
    setDeleteModalOpen(false);
  };

  return (
    <>
      {deleteModalOpen && (
        <div className={styles.modalBg}>
          <div className={styles.modalFront}>
            <div className={styles.modalContentContainer}>
              <div className={styles.modalTitle}>
                Ar tikrai norite panaikinti vartotoją {selectedUser?.username}?
              </div>
              <div className={styles.modalBtnContainer}>
                <button
                  className={styles.cnlBtn}
                  onClick={() => onModalClose()}
                >
                  Atšaukti
                </button>
                <button
                  className={styles.cfmBtn}
                  onClick={() => onDeleteConfirm()}
                >
                  Panaikinti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <table
        className={styles.tableClass}
        style={{
          borderCollapse: "collapse",
          borderRadius: "7px 7px 0 0",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
          width: "95%",
          marginLeft: "2.5%",
        }}
      >
        <thead>
          <tr>
            <th className={styles.userName}>Vardas Pavardė</th>
            <th className={styles.userRole}>Privilegijos </th>
            <th className={styles.userDelete}>Panaikinti</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <TableAllUsersRow
                  key={uuidv4()}
                  id={user.id}
                  username={user.username}
                  role={user.role}
                  onDelete={(e, id, username) => onDelete(e, id, username)}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableAllUsers;
