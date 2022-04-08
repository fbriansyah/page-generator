import { writable } from "svelte/store";
import { arrayToSection, convertSectionToArray } from "../utils/form";

const createSectionsStore = () => {
  const { subscribe, update, set } = writable([]);

  const addFields = (sectionIndex, editorState) => {
    update((sections) => {
      let section = { ...sections[sectionIndex] };

      let _section = _addField(section, editorState);

      sections[sectionIndex] = _section;

      return sections;
    });
  };

  const editFields = (editorSetting, editorState) => {
    update((sections) => {
      const _index = editorSetting.id;
      const _sectionIndex = editorSetting["section-id"];

      let _section = { ...sections[_sectionIndex] };
      let _fields = [..._section.fields];

      if (editorSetting.groupid) {
        const groupid = editorSetting.groupid;
        const groupIndex = _section.fields.findIndex((field) => {
          return field.id === groupid;
        });

        let _group = { ..._section.fields[groupIndex] };
        _group["child"][_index] = { ...editorState };
        _fields[groupIndex] = { ..._group };
      } else {
        _fields[_index] = { ...editorState };
      }

      _section["fields"] = _fields;
      let _sections = [...sections];
      _sections[_sectionIndex] = _section;

      return _sections;
    });
  };

  const saveToLocal = () => {
    if (localStorage) {
      update((sections) => {
        console.log(sections)
        const _sectionArr = convertSectionToArray(sections)
        localStorage.setItem("sections", JSON.stringify(_sectionArr));
        return sections;
      });
    }
  };

  const getFromLocal = () => {
    if (localStorage) {
      const _sectionsStringArr = localStorage.getItem("sections");
      const _sectionsArr = JSON.parse(_sectionsStringArr);
      const _sections = arrayToSection(_sectionsArr)
      if (_sections) {
        set(_sections);
      }
    }
  };

  const addSection = () => {
    update((sections) => {
      const newSection = {
        title: "Judul Section",
        description: "Deskripsi Section",
        id: sections.length,
        fields: [],
      };
      return [...sections, newSection];
    });
  };

  const deleteSection = (id) => {
    update((sections) => {
      return [...sections.filter((section) => section.id !== id)];
    });
  };

  const updateSection = (id, state) => {
    update((sections) => {
      let _sections = [...sections];
      _sections[id] = {
        ..._sections[id],
        title: state["section-title"],
        description: state["section-description"],
      };

      return _sections
    });
  };

  return {
    subscribe,
    addFields,
    editFields,
    saveToLocal,
    getFromLocal,
    addSection,
    deleteSection,
    updateSection
  };
};

function _addField(section, editorState) {
  let _section = { ...section };
  let _fields = [];
  let _editorState = { ...editorState };

  if (_editorState["kind"] && _editorState["kind"] === "gp") {
    _editorState["id"] =
      "gp-" +
      (_section.fields.filter((field) => field.kind === "gp").length + 1);
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
  _fields = [..._section.fields, _editorState];
  _section["fields"] = _fields;

  return _section;
}

export const sectionsStore = createSectionsStore();
