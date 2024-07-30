import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { Game } from "../../hooks/useGames";
import PlatformIconList from "./PlatfromIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../../services/image-url";

interface props {
  game: Game;
}

const GameCard = ({ game }: props) => {
  return (
    <Card minHeight={{ base: "300px", md: "3500px", lg: "350px" }}>
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        <Heading fontSize={"2xl"}>{game.name}</Heading>
        <HStack justifyContent="space-between">
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
