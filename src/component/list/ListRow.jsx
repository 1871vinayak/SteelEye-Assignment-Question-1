import styles from "./ListRow.module.css";

// const ListCell = ({ children }) => {
//   return <tr className={styles.cell}>{children}</tr>;
// };
const ListCell = ({ children,...props }) => {
  return <tr className={styles.cell}{...props}>{children}</tr>;
};

export default ListCell;
