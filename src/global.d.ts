/// <reference types="svelte" />

// Form Type

declare type TFormKind = "ta" | "ti" | "so" | "gp" | "so2" | "sa2"
declare type TGeneralField = {
  kind: TFormKind,
  name: string
}

declare type TGroupField = TGeneralField & {
  type: "s" | "d" | "t",
  child: TGeneralField[]
}
declare type TInputText = TGeneralField & {
  placeholder: string,
	label: string,
	type: "text" |"password"|"email"|"number"
}
declare type TTextArea = TGeneralField & {
  placeholder: string,
	label: string,
}
declare type TGroup = "single" | "double" | "triple"
declare type TEditorSetting = {
  action?: string;
  groupid?: any;
  id?: number;
  "section-id"?: string;
  setting?: {};
};
declare type TOption = {
  label: string;
  value: string;
}

// Page Setting
declare type THeader = {
  label: string;
  type: string;
}
declare type TPageSetting = {
  title: string,
  description: string,
  endpoint: string,
  headers: THeader[],
  filter?: any[],
  editor?: any[]
}
declare type TEditorSetting = {
  action: "change" | "add";
  groupid: string |null;
  id: number;
  settings: {
    kind: TFormKind;
    child: any[] | null;
    label: string;
    name: string;
    placeholder: string;
    type: string;
    options: TOption[]
  }
}