const TYPES = {
  CHANGE_DIRECTORY: Symbol('CHANGE_DIRECTORY'),

  LIST_FILES: Symbol('LIST_FILES'),
  FILES_VIEW: Symbol('FILES_VIEW'),
  SELECT_VIEW: Symbol('SELECT_VIEW'),

  NAVIGATION: Symbol('NAVIGATION'),
  TOGGLE: Symbol('TOGGLE'),
  REFRESH: Symbol('REFRESH'),
  SORT: Symbol('SORT'),

  NEW_FILE: Symbol('NEW_FILE'),
  CREATE_FILE: Symbol('CREATE_FILE'),
  SHARE_FILE: Symbol('SHARE_FILE'),
  RENAME_FILE: Symbol('RENAME_FILE'),
  ACTIVE_FILE: Symbol('ACTIVE_FILE'),
  DELETE_FILE: Symbol('DELETE_FILE'),
  COPY_FILE: Symbol('COPY_FILE'),
  MOVE_FILE: Symbol('MOVE_FILE'),

  MENU: Symbol('MENU'),

  DIALOG: Symbol('DIALOG'),

  SPINNER: Symbol('SPINNER'),

  SETTINGS: Symbol('SETTINGS'),

  SEARCH: Symbol('SEARCH')
};

export default TYPES;
