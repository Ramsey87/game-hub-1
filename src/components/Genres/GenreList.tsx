import { HStack, Image, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import useGenres from "../../hooks/useGenras";
import getCropedImageUrl from "../../services/image-url";

const GenreList = () => {
  const { genres, isLoading, error } = useGenres();

  if (isLoading) return <Spinner />;
  if (error) return null;

  return (
    <List>
      {genres.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={getCropedImageUrl(genre.image_background)}
            />
            <Text fontSize="lg">{genre.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
