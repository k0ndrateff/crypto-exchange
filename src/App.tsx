import styles from '@/styles/App.module.scss';
import { ExchangeForm } from "@/components";
import { ChestIcon } from "@/assets";

const App = () => {

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Crypto Exchange</h1>

        <ChestIcon className={styles.icon} />
      </div>

      <ExchangeForm />

      <span className={styles.tag}>Handcrafted by @k0ndrateff</span>
    </div>
  );
};

export { App };
