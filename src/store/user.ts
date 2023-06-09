import { createSignal, createMemo, createRoot } from "solid-js";

function createCounter() {
  const [user, setUser] = createSignal({ token: '' });

  return { user, setUser };
}

export default createRoot(createCounter);
