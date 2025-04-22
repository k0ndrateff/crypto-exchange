import { Select } from "radix-ui";
import {
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import styles from "./CryptoSelect.module.scss";

const CryptoSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger className={styles.trigger} aria-label="Select cryptocurrency to change">
        <Select.Value />

        <Select.Icon className={styles.icon}>
          <ChevronDownIcon/>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={styles.content}>
          <Select.Viewport className={styles.viewport}>
            <Select.Item value="ETC" className={styles.item}>
              <Select.ItemText>{"ETC"}</Select.ItemText>

              <Select.ItemIndicator className={styles['item-indicator']}>
                <CheckIcon />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export { CryptoSelect };
