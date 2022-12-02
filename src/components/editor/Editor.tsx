import type { ComponentProps } from "solid-js";
import { createEffect, splitProps, on } from "solid-js";

import type { CodeMirrorProps } from "./utils/codemirror";
import { createCodeMirror } from "./utils/codemirror";

import { basicSetup, EditorView } from "codemirror";

import { TabList } from "./TabList";

import { mergeRefs } from "@solid-primitives/refs";

import { createTabList } from "./utils/tabs";

import { githubDark, config } from "@ddietr/codemirror-themes/github-dark";

import { EditorState } from "@codemirror/state";

import "./Editor.scss";

export function Editor(props: ComponentProps<"div"> & CodeMirrorProps) {
  let ref: HTMLDivElement | undefined;
  const [codemirrorProps, others] = splitProps(props, [
    "value",
    "onValueChange",
    "onEditorMount",
  ]);

  const tabsListState = createTabList({
    initialValue: props.value,
  });
  const [tabs, { setState: setTabState }] = tabsListState;

  const { createExtension, getState, getView } = createCodeMirror(
    codemirrorProps,
    () => ref
  );

  const themeExt = createExtension(githubDark);
  const basicExt = createExtension(basicSetup);
  const updateExt = createExtension(
    EditorView.updateListener.of((update) => {
      const activeTab = tabs.list[tabs.active];
      if (activeTab.state) {
        setTabState("list", tabs.active, "state", update.state);
      }
    })
  );

  createEffect(
    on(
      () => tabs.active,
      () => {
        const view = getView();
        if (!view) return;

        const activeTab = tabs.list[tabs.active];
        if (!activeTab.state) {
          const state = EditorState.create({
            doc: activeTab.value,
            extensions: [
              themeExt.extension,
              basicExt.extension,
              activeTab.lang,
              updateExt.extension,
            ],
          });

          setTabState("list", tabs.active, "state", state);
        }

        if (activeTab.state) {
          view.setState(activeTab.state);
        }
      }
    )
  );

  return (
    <div class="flex flex-col w-full h-full">
      <TabList state={getState()} tabsListState={tabsListState} />
      <div
        class={`w-full h-full overflow-auto`}
        style={{
          "background-color": config.background,
        }}
        ref={mergeRefs((el) => (ref = el), props.ref)}
        {...others}
      />
    </div>
  );
}
