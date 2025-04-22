import styles from './ExchangeForm.module.scss';
import { NumberInput } from "@/components/NumberInput/NumberInput";

const ExchangeForm = () => {
  return (
    <form className={styles.root}>
      <NumberInput label="You Send" />

      <NumberInput label="You Get" />
    </form>
  );
};

export { ExchangeForm };
