export type TFormKind = "ta" | "ti" | "so" | "gp"
export type TGroup = "single" | "double" | "triple"
export type TGeneralField = {
  kind: TFormKind;
  name?: string;
  type?: string| TGroup;
  child?: any[];
  placeholder?: string;
  label?: string;
};

export type TSection = {
  title: string,
  description: string,
  fields: any[]
}