import { useEffect, useState } from "react";
import apiClinet from "../services/api-clinet";
import { CanceledError } from "axios";
import { Genre } from "./useGenras";


 export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform}[];
    metacritic: number;
  }
  
interface FetchGameResponse {
    count: number;
    results: Game[];
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useGames = (selectedGenre: Genre | null, selectedPlatform: Platform | null, deps?: any[]) => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] =useState(false)

   
    useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true)
    apiClinet
    .get<FetchGameResponse>("/games", {params: {genres:selectedGenre?.id, platform: selectedPlatform?.id }, signal: controller.signal})
      .then((res) => {
        setIsLoading(false);
        setGames(res.data.results);
        
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setIsLoading(false)
      });
        
        
      return () => controller.abort()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps? [...deps]: []);
 
  return {games, error, isLoading};


}

export default useGames;