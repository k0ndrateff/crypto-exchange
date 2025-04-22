import styles from './InfoDivider.module.scss';
import { HeightIcon } from "@radix-ui/react-icons";

const InfoDivider = () => {
  return (
    <div className={styles.root}>
      <p className={styles.rate}>Exchange Rate: <span>1 ETC ≈ 0.1 BTC</span></p>

      <button type="button">
        <HeightIcon />
      </button>
    </div>
  );
};

export { InfoDivider };
