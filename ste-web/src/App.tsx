import React, { Suspense } from "react";

import Routers from "./components/common/Routers";
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  CSSReset,
} from "@chakra-ui/react";
import { persistor, store } from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import Loading from "./components/common/Loading";
import theme from "./theme";
import McaContextProvider from "./apis/mca/McaContext";
import Fonts from "./theme/Fonts";
import ThemeProviderMode from "./theme/utils/ThemeProviderMode";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <ThemeProviderMode>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <CSSReset />
            <Fonts />
            <BrowserRouter>
              <Suspense fallback={<Loading />}>
                <McaContextProvider>
                  <Box width="100%" height="100%">
                    <Routers />
                  </Box>
                </McaContextProvider>
              </Suspense>
            </BrowserRouter>
          </ThemeProviderMode>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
