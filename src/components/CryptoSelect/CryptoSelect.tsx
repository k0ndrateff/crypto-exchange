import { Popover } from "radix-ui";
import {
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import styles from "./CryptoSelect.module.scss";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Coin } from "@/models";
import { CoinInputModel, exchangeStore } from "@/store";
import { toJS } from "mobx";

interface Props {
  model: CoinInputModel;
}

const CryptoSelect = observer((props: Props) => {
  const { model } = props;

  const { coins } = exchangeStore;

  const [search, setSearch] = useState("");

  const handleChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const filteredCoins = useMemo<Coin[]>(() => {
    const normalized = search.toLowerCase();
    return toJS(coins).filter(c =>
      c.name.toLowerCase().includes(normalized) ||
      c.symbol.toLowerCase().includes(normalized)
    );
  }, [coins, search]);

  return (
    <Popover.Root>
      <Popover.Trigger className={styles.trigger} aria-label="Select cryptocurrency to change">
        {model.coin?.symbol}

        <span className={styles.icon}>
          <ChevronDownIcon/>
        </span>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className={styles.content}>
          <input type="text" className={styles.search} value={search} onChange={handleChangeSearch} />

          <div className={styles.viewport}>
            {filteredCoins.map(coin => (
              <div key={coin.id} className={styles.item} onClick={() => model.setCoin(coin)}>
                <p>{coin.symbol}</p>

                {model.coin?.id === coin.id && (
                  <div className={styles['item-indicator']}>
                    <CheckIcon />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
});

CryptoSelect.displayName = "CryptoSelect";
export { CryptoSelect };
