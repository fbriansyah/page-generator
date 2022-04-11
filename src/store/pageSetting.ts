import { writable } from "svelte/store";

const initialState: TPageSetting = {
  title: "",
  description: "",
  endpoint: "",
  headers: [],
  filter: [],
  editor: [],
};

function _addField(editorState: {}, formFilterFields: any[]) {
  let _editorState = { ...editorState };
  if (_editorState["kind"] && _editorState["kind"] === "gp") {
    _editorState["id"] =
      "gp-" +
      (formFilterFields.filter((field) => field.kind === "gp").length + 1);
    if (_editorState["type"] === "double") {
      _editorState["child"] = [{ kind: "col" }, { kind: "col" }];
    } else if (_editorState["type"] === "triple") {
      _editorState["child"] = [
        { kind: "col" },
        { kind: "col" },
        { kind: "col" },
      ];
    }
  } else {
    _editorState["child"] = null;
  }
  return _editorState;
}

const createStore = () => {
  const { subscribe, update, set } = writable<TPageSetting>(initialState);

  function change(settings: TPageSetting) {
    update((state) => {
      const newState = { ...state };
      const keys = Object.keys(settings);
      keys.forEach((key) => {
        newState[key] = settings[key];
      });

      return newState;
    });
  }

  function setEditor(editor: any[]) {
    update(state => {
      const newState = {...state};
      newState['editor'] = editor;
      return newState;
    })
  }

  function addFields(which: "editor" | "filter", editorState: {}) {
    update((state) => {
      const newState = { ...state };
      if (which === "editor") {
        // newState["editor"] = fields;
        newState.editor = [
          ...newState.editor,
          _addField(editorState, newState.editor),
        ];
      } else if (which === "filter") {
        // newState['filter'] = fields;
        newState.filter = [
          ...newState.filter,
          _addField(editorState, newState.filter),
        ];
      }

      return newState;
    });
  }

  const editFilterFields = (groupId, id, settings) => {
    update((state) => {
      const _filter = [...state.filter];
      if (groupId) {
        // process edit field in group
        const groupIndex = _filter.findIndex(v => v.id === groupId)
        const _group = _filter[groupIndex];
        _group["child"][id] = settings;
        _filter[groupIndex] = _group;
      } else {
        // process singgle field
        _filter[id] = settings;
      }
      const newState = { ...state };
      newState["filter"] = _filter;
      return newState;
    });
  };

  // Save to local storage
  function save() {
    // TODO: Send to server
    subscribe((state) => {
      localStorage.setItem("page-" + state["endpoint"], JSON.stringify(state));
    });
  }

  function load(key: string) {
    const strData = localStorage.getItem(key);

    if (strData && strData !== "") {
      set(JSON.parse(strData));
    }
  }

  return {
    subscribe,
    change,
    addFields,
    editFilterFields,
    setEditor,
    save,
    load,
  };
};

export const pageSetting = createStore();
