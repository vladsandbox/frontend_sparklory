import styles from "@/pages/Profile/index.module.scss";
export const getLinkClass = ({ isActive }: { isActive: boolean }) => `input ${styles.navlink} ${isActive ? styles.active : ""}`;