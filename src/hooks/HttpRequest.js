import { useEffect, useState } from "react";
import axios from "axios";

export function useAxiosGet(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [url]);

  return { data, loading, error };
}
