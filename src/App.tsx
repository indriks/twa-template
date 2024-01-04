import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { ConfigProvider, theme } from "antd";
import { useThemeParams } from "@vkruglikov/react-telegram-web-app";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    background: url("bg.jpg");
    background-size: cover;
    color: white;
  }
  min-height: 100vh;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 10px;
`;

function App() {
  const { network } = useTonConnect();
  const [colorScheme, themeParams] = useThemeParams();

  return (
    <StyledApp>
      <ConfigProvider
        theme={
          themeParams.text_color
            ? {
                algorithm:
                  colorScheme === "dark"
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
                token: {
                  colorText: themeParams.text_color,
                  colorPrimary: themeParams.button_color,
                  colorBgBase: themeParams.bg_color,
                },
              }
            : undefined
        }
      >
        <AppContainer>
          <FlexBoxCol>
            <FlexBoxRow>
              <TonConnectButton />
              <Button>
                {network
                  ? network === CHAIN.MAINNET
                    ? "mainnet"
                    : "testnet"
                  : "N/A"}
              </Button>
            </FlexBoxRow>
            {/* <Counter /> */}
            <TransferTon />
            {/* <Jetton /> */}
          </FlexBoxCol>
        </AppContainer>
      </ConfigProvider>
    </StyledApp>
  );
}

export default App;
