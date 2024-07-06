import { useState } from "react";

const baseURL = process.env.REACT_APP_BACKEND_URL || "https://api.questpro.ng/api/v1";

export default function useRequest(endpoint, method, headers = {}) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [statusCode, setStatusCode] = useState(0);
  const token = localStorage.getItem("token");

  async function makeRequest(data = null, params = {}) {
    setLoading(true);

    const queryParams = new URLSearchParams(params).toString();
    const urlWithParams = queryParams
      ? `${baseURL}${endpoint}?${queryParams}`
      : `${baseURL}${endpoint}`;

    let body;
    let contentType = "application/json";

    if (data instanceof FormData) {
      body = data;
      contentType = "multipart/form-data"; // This is set by the browser automatically
    } else if (method === "POST" || method === "PUT" || method === "DELETE" || method === "PATCH") {
      body = JSON.stringify(data);
    }

    try {
      const response = await fetch(urlWithParams, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers,
          ...(contentType !== "multipart/form-data" && { "Content-Type": contentType }),
        },
        body: body,
      });

      const json = await response.json();

      setResponse(json);
      setStatusCode(response.status);

      setLoading(false);

      return [json, response.status];
    } catch (error) {
      setLoading(false);
      return [null, 0];
    }
  }

  return { loading, makeRequest, response, statusCode };
}
