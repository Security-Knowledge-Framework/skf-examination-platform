import type { ComponentProps } from "solid-js";

export function Button(props: ComponentProps<"button">) {
  return <button type="button" {...props} />;
}
