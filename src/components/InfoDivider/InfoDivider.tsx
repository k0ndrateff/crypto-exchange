import styles from './InfoDivider.module.scss';
import { observer } from "mobx-react-lite";
import { exchangeStore } from "@/store";
import { SwapIcon } from "@/assets";

const InfoDivider = observer(() => {
  return (
    <div className={styles.root}>
      <p className={styles.rate}>Exchange Rate: <span>{exchangeStore.rateDisplay}</span></p>

      <button type="button" className={styles.button} onClick={exchangeStore.swapCoins}>
        <SwapIcon className={styles.icon} />
      </button>
    </div>
  );
});

InfoDivider.displayName = "InfoDivider";
export { InfoDivider };
