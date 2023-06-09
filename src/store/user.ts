import { createSignal, createRoot } from "solid-js";

function createUser() {
  const [user, setUser] = createSignal({ token: '' });

  return { user, setUser };
}

export default createRoot(createUser);
