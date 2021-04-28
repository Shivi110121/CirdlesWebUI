//contains static strings used in the MapOutput component

const denoter = "//\n// **************************************************\n";
const keyValueString =
  "const keyValueString = (scrippsValue, scrippsKey) => {\n  return scrippsKey + ' : ' + scrippsValue\n}\n\n";
const delimit =
  "const delimit = (valueArray) => {\n  return valueArray.join(';')\n}\n\n";

export const LICENSE =
  "// Copyright [2020] [CIRDLES.org] Licensed under the\n" +
  '// Apache License, Version 2.0 (the "License"); you may not use this\n' +
  "// file except in compliance with the License. You may obtain a copy\n" +
  "// of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless\n" +
  "// required by applicable law or agreed to in writing, software distributed\n" +
  '// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES\n' +
  "// OR CONDITIONS OF ANY KIND, either express or implied. See the License\n" +
  "// for the specific language governing permissions and limitations under the License.\n";

  // not being used
export const MMM_INFO =
  "//\n// Mars Map Maker was created by Josh Gilley, Robert Niggebrugge, and Chloe Stapleton\n" +
  "// of CIRDLES.org, with help from James Rundle,\n// under the guidance of Principal Investigator" +
  " Dr. Jim Bowring\n// in coordination with geosamples.org.\n//\n//\n";

export const HEADER_TEXT = denoter + "//\n// Mapping file created with file(s)";

export const HEADER_DENOTER = denoter;

export const MULTIVALUE_FUNCTION_TEXT = keyValueString + delimit;

export const dateString = (prefix, y, d, m) => {
  return (
    'const scrippsDate = (scrippsValue) => {\n  const y  =  "' +
    prefix +
    '" + ' +
    "scrippsValue.substr(" +
    y +
    ")\n  const d = scrippsValue.substr(" +
    d +
    ")\n  const m = scrippsValue.substr(" +
    m +
    ")\n  return y + '-' + m + '-' + d + 'T00:00:00Z'\n}\n\n"
  );
};

export const COMBINATION_TEXT = `let combinations = {
  field_name: delimit,
  description: delimit,
  geological_age: delimit,
  sample_comment: delimit,
  size: delimit
\}\n\n`;

export const STATIC_FUNCTION_TEXT =
  "  collection_start_date: scrippsDate,\n  collection_end_date: scrippsDate," +
  "\n  geological_age: keyValueString,\n  field_name: keyValueString,\n  description: keyValueString," +
  "\n  sample_comment: keyValueString,\n  size: keyValueString\n}\n\n";

export const USER_CODE_ALERT =
  "Sesar Selection 'user_code' must be set before file output\n " +
  "Please do one of the following:\n-- select it in the first row and enter a value\n-- select it as a mapping from your data in any row below that";

export const END_OF_FILE = "return {map, logic, combinations}\n";
