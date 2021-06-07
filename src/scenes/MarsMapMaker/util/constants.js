// these are the sesar titles that accept multiple mappings to them
export const MULTI_VALUE_TITLES = [
  "size",
  "description",
  "sample_comment",
  "geological_age",
  "field_name"
];

// these are the sesar titles that allow a user to create a new attribute to map to sesar
export const METADATA_ADD_SESAR_TITLES = [
  "sample_type",
  "elevation_unit",
  "material"
];

// these are the sesar titles that can have an editable value
export const EDITABLE_SESAR_TITLES = [
  "current_archive",
  "platform_name",
  "cruise_field_prgrm",
  "collector",
  "user_code",
  "sample_type",
  "elevation_unit",
  "material"
];

export const REQUIRED_SESAR_TITLES = ["user_code"];

// these are possible date formats
export const DATE_FORMAT_OPTION = [
  { title: "Select Date Format" },
  { title: "None" },
  { title: "DD/MM/YY or DD-MM-YY", value: "substring", type: "date" },
  { title: "MM/DD/YY or MM-DD-YY", value: "substring", type: "date" },
  { title: "YY/DD/MM or YY-DD-MM", value: "substring", type: "date" },
  { title: "YY/MM/DD or YY-MM-DD", value: "substring", type: "date" },
  { title: "DD/MM/YYYY or DD-MM-YYYY", value: "substring", type: "date" },
  { title: "MM/DD/YYYY or MM-DD-YYYY", value: "substring", type: "date" },
  { title: "YYYY/DD/MM or YYYY-DD-MM", value: "substring", type: "date" },
  { title: "YYYY/MM/DD or YYYY-MM-DD", value: "substring", type: "date" },
  { title: "MMDDYYYY", value: "substring", type: "date" },
  { title: "DDMMYYYY", value: "substring", type: "date" },
  { title: "YYYYDDMM", value: "substring", type: "date" },
  { title: "YYYYMMDD", value: "substring", type: "date" }
];
