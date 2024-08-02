import { useEffect, useState } from "react";
import apiClinet from "../services/api-clinet";
import { CanceledError } from "axios";


 export interface Platform {
    id: number;
    name: string;
    slug: string;
}

interface FetchPlatformResponse {
    count: number;
    results: Platform[];
}

const usePlatform = () => {
    const [platfrom, setPlatform] = useState<Platform[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClinet
      .get<FetchPlatformResponse>("/platforms/lists/parents", {signal: controller.signal})
      .then((res) => {
        setPlatform(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
        
      return () => controller.abort()
  }, []);

  return {platfrom, error, isLoading};
};

export default usePlatform;
