import styles from './InfoDivider.module.scss';
import { HeightIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { exchangeStore } from "@/store";

const InfoDivider = observer(() => {
  return (
    <div className={styles.root}>
      <p className={styles.rate}>Exchange Rate: <span>{exchangeStore.rateDisplay}</span></p>

      <button type="button" onClick={exchangeStore.swapCoins}>
        <HeightIcon />
      </button>
    </div>
  );
});

InfoDivider.displayName = "InfoDivider";
export { InfoDivider };
