import styles from './ExchangeForm.module.scss';
import { NumberInput } from "@/components/NumberInput/NumberInput";
import {InfoDivider} from "@/components/InfoDivider/InfoDivider";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {exchangeStore} from "@/store";
import {ScaleLoader} from "react-spinners";

const ExchangeForm = observer(() => {
  useEffect(() => {
    exchangeStore.initialize();
  }, []);

  return (
    <form className={styles.root} onSubmit={exchangeStore.exchange}>
      <NumberInput model={exchangeStore.sourceModel} label="You Send" />

      <InfoDivider />

      <NumberInput model={exchangeStore.targetModel} label="You Get" />

      <button type="submit" disabled={exchangeStore.isLoading} className={styles.button}>
        {exchangeStore.isLoading ? (
          <ScaleLoader height="1rem" color="var(--foreground)" />
        ) : "Exchange"}
      </button>
    </form>
  );
});

ExchangeForm.displayName = "ExchangeForm";
export { ExchangeForm };
