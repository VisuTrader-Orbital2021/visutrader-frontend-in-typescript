export const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://visutrader-backend.herokuapp.com";

export const DEFAULT_PRIMARY_COLOR = "#536DFE";

export const DEFAULT_SECONDARY_COLOR = "#EC407A";
