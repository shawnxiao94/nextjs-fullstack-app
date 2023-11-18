'use client';

import styles from './index.module.css';

const LoadingDot = ({ color = '#000' }: { color?: string }) => {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};
export default LoadingDot;
