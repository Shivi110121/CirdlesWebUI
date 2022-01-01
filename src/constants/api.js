export const MARS_VERSION = "v2.0.0"; // 17 Nov 2020
export const BASE_URL = "https://cirdles.cs.cofc.edu/Services";
export const AMBAPO_ENDPOINT = BASE_URL + "/ambapo";
export const SQUID_ENDPOINT = BASE_URL + "/prawn";
export const TOPSOIL_ENDPOINT = BASE_URL + "/topsoil";
export const MARS_ENDPOINT = BASE_URL + "/mars";
export const SQUIDINK_ENDPOINT = "http://127.0.0.1:8080/squid_servlet-1.0.0";
export const PORTEDSQUID_ENDPOINT = BASE_URL + "/portedsquid";

// Sesar APIs
// development server - uncomment next line
//export const SESAR_BASE_URL = "https://sesardev.geosamples.org";
// production server - uncomment next line
export const SESAR_BASE_URL = "https://app.geosamples.org";

export const SESAR_LOGIN =
  SESAR_BASE_URL + "/webservices/credentials_service_v2.php";

export const SESAR_SAMPLE_PROFILE =
  SESAR_BASE_URL + "/webservices/display.php?igsn=";
// added oct 2020 to show sample profile with bar code
export const SESAR_SAMPLE_DISPLAY = SESAR_BASE_URL + "/sample/igsn/";
export const SESAR_USER_SAMPLES = SESAR_BASE_URL + "/samples/user_code/";

export const POST_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// Filebrowser
export const FILEBROWSER_URL = "http://127.0.0.1:8081"

export const SQUIDINK_ENABLED = false;
