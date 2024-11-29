// Utils.js

import { formatDateString } from "./utils/DateHelper";
import { hideKeyboard } from "./utils/KeyboardHelper";
import { LoadingModal } from "./utils/LoadingModal";
import { showSnackbar } from "./utils/snackbarHelper";
import { getToken } from "./utils/StorageHelper";

class Utils {
  static showSnackbar =showSnackbar;
  static getToken = getToken;
  static formatDateString = formatDateString;
  static LoadingModal = LoadingModal;
  static hideKeyboard = hideKeyboard;
}

export default Utils;
