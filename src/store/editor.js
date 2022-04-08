import { writable } from "svelte/store";

const createStore = () => {
  const { subscribe, update } = writable({
    pageMode: "editing",
    editorTitle: {
      type: null,
      id: null
    },
  });

  const editing = () => {
    update(settings => {
      return {...settings, pageMode: "editing"}
    })
  };
  const rendering = () => {
    update(settings => {
      return {...settings, pageMode: "rendering"}
    })
  };
  
  const showEditorTitle = (type, id) => {
    update(settings => {
      return {...settings, editorTitle: {type, id}}
    })
  }

  const hideEditorTitle = () => {
    update(settings => {
      return {...settings, editorTitle: {type: null, id:null}}
    })
  }

  return {
    subscribe,
    editing,
    rendering,
    showEditorTitle,
    hideEditorTitle
  };
};

export const editorPageSetting = createStore();
