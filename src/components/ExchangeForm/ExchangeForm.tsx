import styles from './ExchangeForm.module.scss';
import { NumberInput } from "@/components/NumberInput/NumberInput";
import {InfoDivider} from "@/components/InfoDivider/InfoDivider";
import {observer} from "mobx-react-lite";
import {FormEvent, useCallback, useEffect} from "react";
import {exchangeStore} from "@/store";
import {ScaleLoader} from "react-spinners";
import cn from "classnames";

const ExchangeForm = observer(() => {
  useEffect(() => {
    exchangeStore.initialize();
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    exchangeStore.exchange();
  }, []);

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <NumberInput model={exchangeStore.sourceModel} label="You Send" />

      <InfoDivider />

      <NumberInput model={exchangeStore.targetModel} label="You Get" />

      <button type="submit" disabled={Boolean(exchangeStore.isLoading || exchangeStore.successMessage)} className={cn(styles.button, { [styles.success]: Boolean(exchangeStore.successMessage), [styles.loading]: exchangeStore.isLoading })}>
        {exchangeStore.isLoading ? (
          <ScaleLoader height="1rem" color="var(--foreground)" />
        ) : exchangeStore.successMessage ? exchangeStore.successMessage : "Exchange"}
      </button>
    </form>
  );
});

ExchangeForm.displayName = "ExchangeForm";
export { ExchangeForm };
