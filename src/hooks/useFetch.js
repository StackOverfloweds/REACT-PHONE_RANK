import { useState, useEffect } from "react";

const useFetchData = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchFunction()
      .then(response => {
        setData(response.slice(0, 16));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [fetchFunction]);

  return { data, loading, error };
};

export default useFetchData;
