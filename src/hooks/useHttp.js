import { useCallback, useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000";

async function sendHttpRequest(path, options) {
  const url = BASE_URL + path;
  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export function useHttp(path, options, initialValue) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const response = await sendHttpRequest(path, {
          ...options,
          body: data,
        });
        setData(response);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
      setIsLoading(false);
    },
    [path, options]
  );

  useEffect(() => {
    if (
      (options &&
        (options.method?.toUpperCase() === "GET" || !options.method)) ||
      !options
    ) {
      sendRequest();
    }
  }, [sendRequest, options]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    resetError: () => setError(),
    clearData: () => setData(initialValue),
  };
}
