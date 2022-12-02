import type { ComponentProps } from "solid-js";
import type { EditorState } from "@codemirror/state";
import type { createTabList } from "./utils/tabs";

import { javascript } from "@codemirror/lang-javascript";
import { For } from "solid-js";

import { Button } from "./Button";
import { Tab } from "./Tab";

import { createModel } from "./utils/model";

import FluentAdd24Regular from "~icons/fluent/add-24-regular";

import "./TabList.scss";

export function TabList(
  props: ComponentProps<"div"> & {
    state?: EditorState | null;
    tabsListState: ReturnType<typeof createTabList>;
  }
) {
  const [tabs, { addTab, setActive }] = props.tabsListState;
  return (
    <div class="tab-bar">
      <div class="tab-list">
        <For each={tabs.list}>
          {(value, index) => (
            <Tab
              name={value.url.toString()}
              index={index()}
              tabsListState={props?.tabsListState}
            />
          )}
        </For>
      </div>

      <Button
        class="add-tab-btn"
        onClick={() => {
          const model = createModel(
            `const x = \`./test${tabs.list.length + 1}.ts\`;\nconsole.log(x)`,
            javascript({
              jsx: true,
              typescript: true,
            }),
            `./test${tabs.list.length + 1}.ts`
          );

          addTab(model);
          setActive(tabs.list.length - 1);
        }}
      >
        <FluentAdd24Regular />
      </Button>
    </div>
  );
}
