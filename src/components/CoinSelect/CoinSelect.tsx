import { Popover } from "radix-ui";
import {
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import styles from "./CoinSelect.module.scss";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Coin } from "@/models";
import { CoinInputModel, exchangeStore } from "@/store";
import { toJS } from "mobx";
import { ScaleLoader} from "react-spinners";

interface Props {
  model: CoinInputModel;
}

const CoinSelect = observer((props: Props) => {
  const { model } = props;

  const { coins, areCoinsLoading } = exchangeStore;

  const [search, setSearch] = useState("");
  const [opened, setOpened] = useState(false);

  const handleChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleSelectCoin = useCallback((coin: Coin) => {
    model.changeCoin(coin);

    setOpened(false);
  }, [model]);

  const filteredCoins = useMemo<Coin[]>(() => {
    const normalized = search.toLowerCase();

    return toJS(coins).filter(c =>
      c.name.toLowerCase().includes(normalized) ||
      c.symbol.toLowerCase().includes(normalized)
    );
  }, [coins, search]);

  return (
    <Popover.Root open={opened} onOpenChange={setOpened}>
      <Popover.Trigger className={styles.trigger} disabled={areCoinsLoading} aria-label="Select cryptocurrency to change">
        {areCoinsLoading || !model.coin ? (
          <ScaleLoader height="1.25rem" color="var(--foreground)" />
        ) : (
          <>
            {model.coin.symbol}

            <span className={styles.icon}>
              <ChevronDownIcon/>
            </span>
          </>
        )}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className={styles.content}>
          <div className={styles['search-wrapper']}>
            <input type="text" className={styles.search} value={search} onChange={handleChangeSearch} placeholder="Search coins..." />
          </div>

          <div className={styles.viewport}>
            {filteredCoins.map(coin => (
              <div key={coin.id} className={styles.item} onClick={() => handleSelectCoin(coin)}>
                <div className={styles['item-wrapper']}>
                  <p className={styles.symbol}>{coin.symbol}</p>

                  <p className={styles.name}>{coin.name}</p>
                </div>

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

CoinSelect.displayName = "CoinSelect";
export { CoinSelect };
