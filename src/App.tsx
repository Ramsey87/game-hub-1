import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/Navbar/NavBar";
import GameGrid from "./components/games/GameGrid";
import GenreList from "./components/Genres/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenras";
import PlatformSelector from "./components/platform/PlatformSelector";
import { Platform } from "./hooks/useGames";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  return (
    <Grid
      templateAreas={{
        base: `"nav " "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={selectedGenre}
            onSelectGenre={(genre) => setSelectedGenre(genre)}
          />
        </GridItem>
      </Show>

      <GridItem area="main">
        <PlatformSelector
          onSelectPlatform={(platfrom) => setSelectedPlatform(platfrom)}
          selectedPlatform={selectPlatform}
        />
        <GameGrid
          selectedGenre={selectedGenre}
          selectedPlatform={selectPlatform}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
