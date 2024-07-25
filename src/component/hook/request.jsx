import { useState } from "react";

const baseURL = process.env.REACT_APP_BACKEND_URL || "https://api.questpro.ng/api/v1";

export default function useApi(endpoint, method, headers = {}) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [statusCode, setStatusCode] = useState(0);
  const token = localStorage.getItem("token");

  async function makeRequest(data = null, params = {}) {
    setLoading(true);

    const queryParams = new URLSearchParams(params).toString();
    const urlWithParams = queryParams ? `${baseURL}${endpoint}?${queryParams}` : `${baseURL}${endpoint}`;

    try {
      const response = await fetch(urlWithParams, {
        method,
        headers: {
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}`,
          ...headers,
        },
        body: method !== "GET" && data !== null ? JSON.stringify(data) : undefined,
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
