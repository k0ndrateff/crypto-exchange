import styles from './ExchangeForm.module.scss';
import { CryptoInput } from "@/components/CryptoInput/CryptoInput";

const ExchangeForm = () => {
  return (
    <form className={styles.root}>
      <CryptoInput label="You Send" />

      <CryptoInput label="You Get" />
    </form>
  );
};

export { ExchangeForm };
