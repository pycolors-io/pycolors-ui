import type { Meta } from "@storybook/react-vite";
import { Variants as ButtonsStory } from "./components/button.stories.js";
import { Composition as CardsStory } from "./components/card.stories.js";
import { States as CheckboxesStory } from "./components/checkbox.stories.js";
import { Variants as BadgesStory } from "./components/badge.stories.js";
import { States as InputsStory } from "./components/input.stories.js";
import { Default as SkeletonsStory } from "./components/skeleton.stories.js";
import { WithAction as EmptyStatesStory } from "./components/empty-state.stories.js";
import { Variants as AlertsStory } from "./components/alert.stories.js";
import { Default as DialogsStory } from "./components/dialog.stories.js";
import { Default as SeparatorsStory } from "./components/separator.stories.js";
import { Default as SheetsStory } from "./components/sheet.stories.js";
import { Default as DropdownMenusStory } from "./components/dropdown-menu.stories.js";
import { Default as TabSetsStory } from "./components/tabs.stories.js";
import { Default as ToastsStory } from "./components/toast.stories.js";
import { LinkComposition as PaginationLinkCompositionStory } from "./components/pagination.stories.js";
import { Default as PaginationControlsStory } from "./components/pagination.stories.js";
import { RowsAndEmptySection as TablesStory } from "./components/table.stories.js";
import { States as TextareasStory } from "./components/textarea.stories.js";
import { Default as PasswordInputsStory } from "./components/password-input.stories.js";

// Compatibility only: do not add examples here. See stories/README.md.
export default {
  id: "ui-public-component-surface",
  tags: ["legacy"],
  title: "UI/Public component surface",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export const Buttons: typeof ButtonsStory = { ...ButtonsStory };
export const Cards: typeof CardsStory = { ...CardsStory };
export const Checkboxes: typeof CheckboxesStory = { ...CheckboxesStory };
export const Badges: typeof BadgesStory = { ...BadgesStory };
export const Inputs: typeof InputsStory = { ...InputsStory };
export const Skeletons: typeof SkeletonsStory = { ...SkeletonsStory };
export const EmptyStates: typeof EmptyStatesStory = {
  ...EmptyStatesStory,
  args: { title: "No projects yet" },
};
export const Alerts: typeof AlertsStory = { ...AlertsStory };
export const Dialogs: typeof DialogsStory = { ...DialogsStory };
export const Separators: typeof SeparatorsStory = { ...SeparatorsStory };
export const Sheets: typeof SheetsStory = { ...SheetsStory };
export const DropdownMenus: typeof DropdownMenusStory = {
  ...DropdownMenusStory,
};
export const TabSets: typeof TabSetsStory = { ...TabSetsStory };
export const Toasts: typeof ToastsStory = { ...ToastsStory };
export const PaginationLinkComposition: typeof PaginationLinkCompositionStory =
  { ...PaginationLinkCompositionStory };
export const PaginationControls: typeof PaginationControlsStory = {
  ...PaginationControlsStory,
};
export const Tables: typeof TablesStory = { ...TablesStory };
export const Textareas: typeof TextareasStory = { ...TextareasStory };
export const PasswordInputs: typeof PasswordInputsStory = {
  ...PasswordInputsStory,
};
