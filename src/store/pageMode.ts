import {writable} from 'svelte/store';

const createStore = () => {
  const {subscribe, set} = writable<"page"|"editor">("page");

  const page = () => set("page");
  const editor = () => set("editor");

  return {
    subscribe,
    editor,
    page,
  }
}

export const pageModeStore = createStore()