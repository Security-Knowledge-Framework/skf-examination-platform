import {
  type Accessor,
  onCleanup,
  onMount,
  on,
  createEffect,
  createSignal,
} from "solid-js";
import { EditorView } from "@codemirror/view";
import {
  Compartment,
  EditorState,
  StateEffect,
  Transaction,
  type Extension,
} from "@codemirror/state";

export interface CodeMirrorProps {
  /**
   * The initial value of the editor.
   */
  value?: string;
  /**
   * Called whenever the editor code value changes.
   */
  onValueChange?: (value: string, transaction: Transaction) => void;
  /**
   * Called when the editor first mounts, receiving the current EditorView instance.
   */
  onEditorMount?: (editor: EditorView) => void;
}

/**
 * Creates a CodeMirror editor view instance (the editor's user interface).
 * @param props See {@link CodeMirrorProps} for details.
 * @param ref the element to attach the editor to on creation.
 */
export function createCodeMirror(
  props: CodeMirrorProps,
  ref: Accessor<HTMLDivElement | undefined>
) {
  const [getValue, setValue] = createSignal(props.value);
  const [getView, setView] = createSignal<EditorView | null | undefined>(null);
  const [getState, setState] = createSignal<EditorState | null | undefined>(
    null
  );

  onMount(() => {
    setView(
      new EditorView({
        parent: ref(),
      })
    );

    onCleanup(() => {
      const view = getView();
      if (!view) return;
      view.destroy();
    });
  });

  createEffect(
    on(
      getValue,
      (val) => {
        const view = getView();
        if (!view || val === view.state.doc.toString()) {
          return;
        }
        view.dispatch({
          changes: {
            from: 0,
            to: view.state.doc.length,
            insert: val,
          },
        });
      },
      { defer: true }
    )
  );

  createEffect(
    on(
      () => getView()?.state,
      () => {
        const view = getView();
        if (!view) return;
        setState(view.state);
      },
      { defer: true }
    )
  );

  /**
   * Creates a compartment instance with the given extension and appends it to the top-level configuration of the editor.
   * See {@link https://codemirror.net/examples/config/| CodeMirror Configuration} and {@link https://codemirror.net/docs/ref/#state.Compartment| Compartment} for details on editor configuration.
   * @param extension the extension to append
   */
  function createExtension(extension: Extension) {
    const compartment = new Compartment();

    // setExtensions([extensions(), compartment].flat() as Extension)

    onMount(() => {
      const view = getView();
      if (!view) return;

      view.dispatch({
        effects: StateEffect.appendConfig.of(compartment.of(extension)),
      });
    });

    /**
     * Reconfigures the extension compartment with the given extension.
     * @param extension the extension to reconfigure the extension compartment with.
     */
    function reconfigure(extension: Extension) {
      const view = getView();
      if (!view) return;

      view.dispatch({
        effects: compartment.reconfigure(extension),
      });
    }

    return { compartment, reconfigure, extension };
  }

  return {
    createExtension,
    getState,
    setState,
    getValue,
    setValue,
    getView,
    setView,
  };
}
