import styles from "./LoadingSpinner.module.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <div className={styles.LoadingSpinner}></div>
    </div>
  );
};

export default LoadingSpinner;
