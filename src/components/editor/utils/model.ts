import type { LanguageSupport } from "@codemirror/language";
import type { Transaction } from "@codemirror/state";
import type { EditorState } from "@codemirror/state";

export interface IModel {
  url: URL | string;
  value: string;
  state?: EditorState | null;
  transactions: Transaction[];
  lang: LanguageSupport;
}

export function createModel(
  value: string,
  lang: LanguageSupport,
  url: URL | string
): IModel {
  const state = null;
  return {
    url: url.toString(),
    value,
    state,
    transactions: [],
    lang,
  };
}
