import { javascript } from "@codemirror/lang-javascript";
import { createStore } from "solid-js/store";
import { createModel, type IModel } from "./model";

export type TabListState = {
  initialValue: string;
  list: IModel[];
  active: number;
};

export type TabListValue = ReturnType<typeof createTabList>;

export function createTabList(props: Partial<TabListState> = {}) {
  const initialValue = props.initialValue ?? `console.log("Initial State")`;
  const defaultState: TabListState = {
    initialValue: initialValue,
    list: [
      createModel(
        initialValue,
        javascript({
          jsx: true,
          typescript: true,
        }),
        "./test.ts"
      ),
    ],
    active: 0,
  };

  const [state, setState] = createStore<TabListState>({
    list: props.list ?? defaultState.list,
    active: props.active ?? defaultState.active,
    initialValue: initialValue,
  });

  const addTab = (model: IModel) => setState("list", [...state.list, model]);
  const removeTab = (index: number) => {
    return setState("list", [
      ...state.list.slice(0, index),
      ...state.list.slice(index + 1),
    ]);
  };
  const setActive = (index: number) => setState("active", index);
  return [state, { addTab, removeTab, setActive, setState }] as const;
}
