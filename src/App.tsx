import styles from '@/styles/App.module.scss';
import { ExchangeForm } from "@/components";

const App = () => {

  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>Crypto Exchange</h1>

      <ExchangeForm />
    </div>
  );
};

export { App };
