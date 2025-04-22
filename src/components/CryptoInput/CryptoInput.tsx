import styles from './CryptoInput.module.scss';
import { useId } from "react";

interface Props {
  label: string;
}

const CryptoInput = (props: Props) => {
  const { label } = props;

  const id = useId();

  return (
    <div className={styles.root}>
      <div className={styles['input-wrapper']}>
        <label htmlFor={id} className={styles.label}>{label}</label>

        <input type="number" min={0} className={styles.input} />
      </div>
    </div>
  );
};

export { CryptoInput };
