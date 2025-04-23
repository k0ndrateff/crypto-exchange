export const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: unknown[]) {
    const context = window;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, delay);
  };
};
