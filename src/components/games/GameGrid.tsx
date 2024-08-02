import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../../hooks/useGames";
import GameCard from "../game-cards/GameCard";
import GameCardSkeleton from "../game-cards/GameCardSkeleton";
import GameCardContainer from "../game-cards/GameCardContainer";
import { Genre } from "../../hooks/useGenras";
import { Platform } from "../../hooks/usePlatform";

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
}

const GameGrid = ({ selectedGenre, selectedPlatform }: Props) => {
  const { games, error, isLoading } = useGames(
    selectedGenre,
    selectedPlatform,
    [selectedGenre?.id, selectedPlatform?.id]
  );

  const Skeleton = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={3}
      >
        {isLoading &&
          Skeleton.map((skelton) => (
            <GameCardContainer key={skelton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {games.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
