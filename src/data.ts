// import type { TGeneralField } from "./interfaces";

export let formFields = [
  {
    kind: "gp",
    type: "double",
    child: [
      {
        kind: "ti",
        name: "first-name",
        label: "First name",
        placeholder: "Masukkan nama depan Anda",
        type: "text",
      },
      {
        kind: "ti",
        name: "last-name",
        label: "Last name",
        placeholder: "Masukkan nama belakang Anda",
        type: "text",
      },
    ],
  },
  {
    kind: "gp",
    type: "double",
    child: [
      {
        kind: "ti",
        name: "email-address",
        label: "Email address",
        placeholder: "Masukkan alamat email Anda",
        type: "email",
      },
      {
        kind: "so",
        name: "country",
        label: "Country",
        options: [
          { label: "United States", value: "us" },
          { label: "Canada", value: "canada" },
          { label: "Mexico", value: "mexico" },
        ],
      },
    ],
  },
  {
    kind: "ta",
    name: "street-address",
    label: "Address",
    placeholder: "Masukkan nama alamat Anda",
  },
  {
    kind: "gp",
    type: "triple",
    child: [
      {
        kind: "ti",
        name: "city",
        label: "Kota",
        placeholder: "Masukkan kota Anda",
        type: "text",
      },
      {
        kind: "ti",
        name: "provinsi",
        label: "Provinsi",
        placeholder: "",
        type: "text",
      },
      {
        kind: "ti",
        name: "kodepos",
        label: "Kode Pos",
        child: null,
        placeholder: "",
        type: "text",
      },
    ],
  },
];

export let editorForm = [
  {
    kind: "so",
    name: "kind",
    label: "Jenis Field",
    child: null,
    options: [
      { label: "Group", value: "gp" },
      { label: "Text Input", value: "ti" },
      { label: "Text Area", value: "ta" },
      { label: "Select", value: "so2" },
      { label: "Column", value: "col" },
    ],
  },
];

export let GroupEditor = [
  {
    kind: "so",
    name: "type",
    label: "Tipe",
    child: null,
    options: [
      { label: "Double", value: "double" },
      { label: "Triple", value: "triple" },
    ],
  },
]

export let TextInputEditor = [
  {
    kind: "gp",
    type: "double",
    child: [
      {
        kind: "ti",
        name: "name",
        label: "Name",
        placeholder: "Masukkan Field id",
        child: null,
        type: "text",
      },
      {
        kind: "ti",
        name: "label",
        label: "Label",
        placeholder: "Masukkan Field label",
        child: null,
        type: "text",
      },
    ],
  },
  {
    kind: "gp",
    type: "double",
    child: [
      {
        kind: "ti",
        name: "placeholder",
        label: "Placeholder",
        placeholder: "Placeholder atau hint",
        child: null,
        type: "text",
      },
      {
        kind: "so",
        name: "type",
        label: "Tipe",
        child: null,
        options: [
          { label: "Text", value: "text" },
          { label: "Email", value: "email" },
          { label: "Password", value: "password" },
        ],
      },
    ],
  },
]

export let TextAreaEditor = [
  {
    kind: "gp",
    type: "double",
    child: [
      {
        kind: "ti",
        name: "name",
        label: "Name",
        placeholder: "Masukkan Field id",
        child: null,
        type: "text",
      },
      {
        kind: "ti",
        name: "label",
        label: "Label",
        placeholder: "Masukkan Field label",
        child: null,
        type: "text",
      },
    ],
  },
  {
    kind: "ti",
    name: "placeholder",
    label: "Placeholder",
    placeholder: "Placeholder atau hint",
    child: null,
    type: "text",
  },
]

const sectionTitleEditor = [
  {
    kind: "ti",
    name: "section-title",
    label: "Judul",
    placeholder: "Masukkan judul Section",
    child: null,
    type: "text",
  },
  {
    kind: "ti",
    name: "section-description",
    label: "Deskripsi",
    placeholder: "Masukkan deskripsi Section",
    child: null,
    type: "text",
  },
]

export let select2Editor = [
  {
    kind: "gp",
    type: "double",
    child: [
      {
        kind: "ti",
        name: "name",
        label: "Name",
        placeholder: "Masukkan Field id",
        child: null,
        type: "text",
      },
      {
        kind: "ti",
        name: "label",
        label: "Label",
        placeholder: "Masukkan Field label",
        child: null,
        type: "text",
      },
    ],
  },
]

export function getEditor(mode) {
  switch (mode) {
    case "gp":
      return [...GroupEditor];
    case "ti":
      return [...TextInputEditor];
    case "ta":
      return [...TextAreaEditor];
    case "section-title":
      return [...sectionTitleEditor];
    case "so2":
      return [...select2Editor];
    default:
      return [];
  }
}