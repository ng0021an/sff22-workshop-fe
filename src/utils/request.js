const NODE_ENDPOINT = import.meta.env.VITE_NODE_ENDPOINT;
const NODE_USERNAME = import.meta.env.VITE_NODE_USERNAME;
const NODE_PASSWORD = import.meta.env.VITE_NODE_PASSWORD;
const AUTH_TOKEN = btoa(`${NODE_USERNAME}:${NODE_PASSWORD}`);

// Util function fot GET request
export const get = async (getOptions) => {
  const { endpoint = NODE_ENDPOINT, query = {}, path = "" } = getOptions;

  const queryString = new URLSearchParams(query).toString();

  const response = await fetch(
    `${endpoint}${path}${queryString ? "?" + queryString : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // If it's Coinbase Cloud Node endpoint,
        // we will add auth header
        ...(endpoint === NODE_ENDPOINT
          ? { Authorization: `Basic ${AUTH_TOKEN}` }
          : {}),
      },
    },
  );
  if (!response.ok) {
    const msg = await response.text();
    console.log(
      `GET Request failed with status ${response.status} and message ${msg}!`,
    );
    throw new Error(msg);
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const data = await response.json();
    return data;
  }

  return "";
};

// Util function fot POST request
export const post = async (postOptions) => {
  const { endpoint = NODE_ENDPOINT, body = {}, path = "" } = postOptions;

  const response = await fetch(`${endpoint}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // If it's Coinbase Cloud Node endpoint,
      // we will add auth header
      ...(endpoint === NODE_ENDPOINT
        ? { Authorization: `Basic ${AUTH_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(
      `POST Request to Coinbase Cloud Node failed with status ${response.status}!`,
    );
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const data = await response.json();
    return data;
  }

  return "";
};
