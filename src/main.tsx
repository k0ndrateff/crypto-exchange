import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { App } from "@/App";
import "@/styles/index.scss";

// initial configuration for mobx
setTimeout(() => {
  configure({
    enforceActions: 'never',
    isolateGlobalState: true,
    reactionScheduler: f => setTimeout(f),
  });
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
