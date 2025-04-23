import styles from './NumberInput.module.scss';
import {ChangeEvent, useCallback, useEffect, useId, useState} from "react";
import { CoinSelect } from "@/components/CoinSelect/CoinSelect.tsx";
import {CoinInputModel} from "@/store";
import {observer} from "mobx-react-lite";
import {ScaleLoader} from "react-spinners";
import cn from "classnames";

const INPUT_STEP = 1 / 1000000000000;

interface Props {
  label: string;
  model: CoinInputModel;
}

const NumberInput = observer((props: Props) => {
  const { label, model } = props;

  const id = useId();

  const [amount, setAmount] = useState(String(model.amount));

  useEffect(() => {
    setAmount(String(model.amount));
  }, [model.amount]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // replace comma with a dot (both are decimal dividers, but comma is not recognized in js)
    newValue = newValue.replace(",", ".");

    if (/^[0-9]*[.]?[0-9]*$/.test(newValue) || newValue === "") {
      setAmount(newValue);

      const numericValue = Number(newValue);

      if (!isNaN(numericValue)) {
        model.changeAmount(numericValue);
      }
    }
  }, [model]);

  return (
    <div className={cn(styles.root, { [styles.invalid]: Boolean(model.error) })}>
      <div className={styles['input-wrapper']}>
        <div className={styles['top-wrapper']}>
          <label htmlFor={id} className={styles.label}>{label}</label>

          {model.error && (
            <p className={styles.error}>{model.error}</p>
          )}
        </div>

        {model.isLoading ? (
          <ScaleLoader height="1.65rem" color="var(--foreground)" />
        ) : (
          <input value={amount} type="text" min={0} inputMode="decimal" step={INPUT_STEP} className={styles.input} onChange={handleChange} />
        )}
      </div>

      <CoinSelect model={model} />
    </div>
  );
});

NumberInput.displayName = "NumberInput";
export { NumberInput };
