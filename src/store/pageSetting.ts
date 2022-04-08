import { writable } from 'svelte/store';

const initialState: TPageSetting = {
  title: "",
  description: "",
  endpoint: "",
  headers: [],
  filter: [],
  editor: []
}

const createStore = () => {
  const {subscribe, update, set} = writable<TPageSetting>(initialState);

  function change(settings: TPageSetting) {
    console.log(settings);
    update(state => {
      const newState = {...state};
      const keys = Object.keys(settings);
      keys.forEach(key => {
        newState[key] = settings[key];
      });

      return newState;
    })
  }

  function addFields(which: "editor" | "filter", fields: []) {
    console.log(which, fields);
    update(state => {
      const newState = {...state}
      if(which === 'editor') {
        newState["editor"] = fields;
      } else if (which === 'filter') {
        newState['filter'] = fields;
      }

      return newState
    })
  }

  // Save to local storage
  function save() {
    // TODO: Send to server
    subscribe(state => {
      console.log("save")
      localStorage.setItem('page-'+state["endpoint"], JSON.stringify(state))
    })
  }

  function load(key: string) {
    const strData = localStorage.getItem(key);

    if(strData && strData !== '') {
      set(JSON.parse(strData))
    }
  }

  return {
    subscribe,
    change,
    addFields,
    save,
    load
  }
}

export const pageSetting = createStore()