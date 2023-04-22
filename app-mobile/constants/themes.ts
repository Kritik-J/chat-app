export const LIGHT_MODE = "light";
export const DARK_MODE = "dark";

export const LIGHT_BACKGROUND = "#ffffff";
export const LIGHT_TEXT = "#000000";
export const LIGHT_LINK = "#34B7F1";
export const LIGHT_HIGHLIGHT = "#128C7E";
export const LIGHT_PRIMARY_BUTTON_COLOR = "#000000";
export const LIGHT_PRIMARY_BUTTON_TEXT_COLOR = "#ffffff";
export const LIGHT_TEXT_INPUT_BORDER_COLOR = "#000000";
export const LIGHT_TEXT_INPUT_FONT_COLOR = "#000000";
export const LIGHT_HEADER_COLOR = "#128C7E";
export const LIGHT_BOTTOM_TAB_BAR_COLOR = "#f5f5f5";
export const LIGHT_BOTTOM_TAB_BAR_ACTIVE_COLOR = "#128C7E";
export const LIGHT_BOTTOM_TAB_BAR_INACTIVE_COLOR = "#000000";
export const LIGHT_ICON_COLOR = "#000000";
export const LIGHT_BOTTOM_SHEET_BACKGROUND_COLOR = "#f5f5f5";
export const LIGHT_BOTTOM_SHEET_INDICATOR_COLOR = "#000000";
export const LIGHT_CATEGORY_BACKGROUND_COLOR = "#f5f5f5";
export const LIGHT_CHAT_LiST_ITEM_RIPPLE = "rgba(0, 0, 0, 0.1)";
export const LIGHT_LINE_COLOR = "#e0e0e0";
export const LIGHT_MESSAGE_BACKGROUND_COLOR = "#ffffff";
export const LIGHT_MY_MESSAGE_BACKGROUND_COLOR = "#dcf8c6";
export const LIGHT_CHAT_DATE_HEADER = "#ffffff";
export const LIGHT_SEARCH_BAR_BACKGROUND_COLOR = "#f5f5f5";

export const DARK_BACKGROUND = "#000000";
export const DARK_TEXT = "#ffffff";
export const DARK_LINK = "#34B7F1";
export const DARK_HIGHLIGHT = "#128C7E";
export const DARK_PRIMARY_BUTTON_COLOR = "#ffffff";
export const DARK_PRIMARY_BUTTON_TEXT_COLOR = "#000000";
export const DARK_TEXT_INPUT_BORDER_COLOR = "#ffffff";
export const DARK_TEXT_INPUT_FONT_COLOR = "#ffffff";
export const DARK_HEADER_COLOR = "#273443";
export const DARK_BOTTOM_TAB_BAR_COLOR = "#273443";
export const DARK_BOTTOM_TAB_BAR_ACTIVE_COLOR = "#ffffff";
export const DARK_BOTTOM_TAB_BAR_INACTIVE_COLOR = "#b0bec5";
export const DARK_ICON_COLOR = "#ffffff";
export const DARK_BOTTOM_SHEET_BACKGROUND_COLOR = "#212121";
export const DARK_BOTTOM_SHEET_INDICATOR_COLOR = "#ffffff";
export const DARK_CATEGORY_BACKGROUND_COLOR = "#171717";
export const DARK_CHAT_LiST_ITEM_RIPPLE = "rgba(255, 255, 255, 0.1)";
export const DARK_LINE_COLOR = "#212121";
export const DARK_MESSAGE_BACKGROUND_COLOR = "#272727";
export const DARK_MY_MESSAGE_BACKGROUND_COLOR = "#075E54";
export const DARK_CHAT_DATE_HEADER = "#272727";
export const DARK_SEARCH_BAR_BACKGROUND_COLOR = "#212121";

export const ERROR_COLOR = "#f3405e";
export const WARNING_COLOR = "#f7a90d";
export const INFO_COLOR = "#12b2e8";
export const SUCCESS_COLOR = "#14A44D";

export const LIGHT_THEME = {
  colors: {
    background: LIGHT_BACKGROUND,
    text: LIGHT_TEXT,
    highlight: LIGHT_HIGHLIGHT,
    link: LIGHT_LINK,
    primaryButtonColor: LIGHT_PRIMARY_BUTTON_COLOR,
    primaryButtonTextColor: LIGHT_PRIMARY_BUTTON_TEXT_COLOR,
    textInputBorderColor: LIGHT_TEXT_INPUT_BORDER_COLOR,
    textInputFontColor: LIGHT_TEXT_INPUT_FONT_COLOR,
    header: LIGHT_HEADER_COLOR,
    bottomTabBar: LIGHT_BOTTOM_TAB_BAR_COLOR,
    bottomTabBarActive: LIGHT_BOTTOM_TAB_BAR_ACTIVE_COLOR,
    bottomTabBarInactive: LIGHT_BOTTOM_TAB_BAR_INACTIVE_COLOR,
    bottomSheetBackgroundColor: LIGHT_BOTTOM_SHEET_BACKGROUND_COLOR,
    bottomSheetIndicatorColor: LIGHT_BOTTOM_SHEET_INDICATOR_COLOR,
    categoryBackgroundColor: LIGHT_CATEGORY_BACKGROUND_COLOR,
    chatListItemRipple: LIGHT_CHAT_LiST_ITEM_RIPPLE,
    chatListItemBorder: LIGHT_CHAT_LiST_ITEM_RIPPLE,
    chatMessageBackgroundColor: LIGHT_MESSAGE_BACKGROUND_COLOR,
    chatMyMessageBackgroundColor: LIGHT_MY_MESSAGE_BACKGROUND_COLOR,
    chatDateHeader: LIGHT_CHAT_DATE_HEADER,
    searchBarBackground: LIGHT_SEARCH_BAR_BACKGROUND_COLOR,
    lineColor: LIGHT_LINE_COLOR,
    iconColor: LIGHT_ICON_COLOR,
    errorColor: ERROR_COLOR,
    warningColor: WARNING_COLOR,
    infoColor: INFO_COLOR,
    successColor: SUCCESS_COLOR,
  },
};

export const DARK_THEME = {
  colors: {
    background: DARK_BACKGROUND,
    text: DARK_TEXT,
    highlight: DARK_HIGHLIGHT,
    link: DARK_LINK,
    primaryButtonColor: DARK_PRIMARY_BUTTON_COLOR,
    primaryButtonTextColor: DARK_PRIMARY_BUTTON_TEXT_COLOR,
    textInputBorderColor: DARK_TEXT_INPUT_BORDER_COLOR,
    textInputFontColor: DARK_TEXT_INPUT_FONT_COLOR,
    header: DARK_HEADER_COLOR,
    bottomTabBar: DARK_BOTTOM_TAB_BAR_COLOR,
    bottomTabBarActive: DARK_BOTTOM_TAB_BAR_ACTIVE_COLOR,
    bottomTabBarInactive: DARK_BOTTOM_TAB_BAR_INACTIVE_COLOR,
    categoryBackgroundColor: DARK_CATEGORY_BACKGROUND_COLOR,
    chatListItemRipple: DARK_CHAT_LiST_ITEM_RIPPLE,
    chatListItemBorder: DARK_CHAT_LiST_ITEM_RIPPLE,
    chatMessageBackgroundColor: DARK_MESSAGE_BACKGROUND_COLOR,
    chatMyMessageBackgroundColor: DARK_MY_MESSAGE_BACKGROUND_COLOR,
    chatDateHeader: DARK_CHAT_DATE_HEADER,
    searchBarBackground: DARK_SEARCH_BAR_BACKGROUND_COLOR,
    lineColor: DARK_LINE_COLOR,
    iconColor: DARK_ICON_COLOR,
    errorColor: ERROR_COLOR,
    warningColor: WARNING_COLOR,
    infoColor: INFO_COLOR,
    successColor: SUCCESS_COLOR,
  },
};

const themes = {
  [LIGHT_MODE]: LIGHT_THEME,
  [DARK_MODE]: DARK_THEME,
};

export default themes;
