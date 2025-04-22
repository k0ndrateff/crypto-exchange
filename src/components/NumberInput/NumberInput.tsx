import styles from './NumberInput.module.scss';
import {ChangeEvent, useCallback, useId} from "react";
import { CryptoSelect } from "@/components/CryptoSelect/CryptoSelect";
import {CoinInputModel} from "@/store";
import {observer} from "mobx-react-lite";

interface Props {
  label: string;
  model: CoinInputModel;
}

const NumberInput = observer((props: Props) => {
  const { label, model } = props;

  const id = useId();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    model.changeAmount(Number(e.target.value));
  }, [model]);

  return (
    <div className={styles.root}>
      <div className={styles['input-wrapper']}>
        <label htmlFor={id} className={styles.label}>{label}</label>

        <input value={model.amount} type="number" min={0} step={0.0000000000000000001} className={styles.input} onChange={handleChange} />
      </div>

      <CryptoSelect model={model} />
    </div>
  );
});

NumberInput.displayName = "NumberInput";
export { NumberInput };
