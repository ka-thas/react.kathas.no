import { tabTitle } from "../lib/pages";

// The browser tab's title. React 19 moves a <title> rendered anywhere into <head>,
// so each page just renders one of these.
export default function PageTitle({ title }) {
  return <title>{tabTitle(title)}</title>;
}
