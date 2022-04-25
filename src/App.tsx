import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { useInterval } from "@chakra-ui/react";
import React from "react";

function App() {
  const [progressAmount, setProgressAmount] = React.useState<number>(0);
  const [isDownloading, setIsDownloading] = React.useState(false);

  useInterval(
    () => {
      if (progressAmount < 100) {
        setProgressAmount((cur) => cur + 1);
      } else {
        setIsDownloading(false);
      }
    },
    isDownloading ? 16 : null
  );

  const handleToggle = React.useCallback(() => {
    setIsDownloading((cur) => !cur);
    if (progressAmount === 100) {
      setProgressAmount(0);
    }
  }, [setIsDownloading, setProgressAmount, progressAmount]);

  return (
    <Grid templateColumns="1fr 1fr" templateRows="1fr" h="100vh" p={10}>
      <GridItem alignSelf="center" justifySelf="center">
        <Button onClick={handleToggle}>
          {isDownloading ? "Stop download" : "Start download"}
        </Button>
      </GridItem>

      <GridItem alignSelf="center">
        <Progress
          size="lg"
          rounded="lg"
          colorScheme={progressAmount === 100 ? "green" : "blue"}
          value={progressAmount}
          isAnimated={isDownloading}
          hasStripe={progressAmount === 100 ? false : true}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
