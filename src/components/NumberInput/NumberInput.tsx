import styles from './NumberInput.module.scss';
import { useId } from "react";
import { CryptoSelect } from "@/components/CryptoSelect/CryptoSelect";

interface Props {
  label: string;
}

const NumberInput = (props: Props) => {
  const { label } = props;

  const id = useId();

  return (
    <div className={styles.root}>
      <div className={styles['input-wrapper']}>
        <label htmlFor={id} className={styles.label}>{label}</label>

        <input type="number" min={0} className={styles.input} />
      </div>

      <CryptoSelect />
    </div>
  );
};

export { NumberInput };
