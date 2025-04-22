import styles from './ExchangeForm.module.scss';
import { NumberInput } from "@/components/NumberInput/NumberInput";
import {InfoDivider} from "@/components/InfoDivider/InfoDivider";

const ExchangeForm = () => {
  return (
    <form className={styles.root}>
      <NumberInput label="You Send" />

      <InfoDivider />

      <NumberInput label="You Get" />
    </form>
  );
};

export { ExchangeForm };
