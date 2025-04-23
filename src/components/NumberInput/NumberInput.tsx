import styles from './NumberInput.module.scss';
import {ChangeEvent, useCallback, useId} from "react";
import { CoinSelect } from "@/components/CoinSelect/CoinSelect.tsx";
import {CoinInputModel} from "@/store";
import {observer} from "mobx-react-lite";
import {ScaleLoader} from "react-spinners";
import cn from "classnames";

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
          <input value={model.amount} type="number" min={0} step={0.0000000000000000001} className={styles.input} onChange={handleChange} />
        )}
      </div>

      <CoinSelect model={model} />
    </div>
  );
});

NumberInput.displayName = "NumberInput";
export { NumberInput };
