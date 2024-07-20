import { useEffect, useState } from "react";
import apiClinet from "../services/api-clinet";
import { CanceledError } from "axios";

interface Game {
    id: number;
    name: string;
  }
  
interface FetchGameResponse {
    count: number;
    results: Game[];
  }


const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClinet
      .get<FetchGameResponse>("/games", {signal: controller.signal})
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)});
        
      return () => controller.abort()
  }, []);

  return {games, error};


}

export default useGames;