import styled, { createGlobalStyle } from "styled-components";
import { ApolloProvider } from "@apollo/client";

import client from "../shared/apollo-client";
import FavoriteContextProvider from "../shared/contexts/FavoriteContext/FavoriteContext";

const GlobalStyle = createGlobalStyle`
  @font-face {font-family: "Bank Gothic"; src: url("//db.onlinewebfonts.com/t/f60a44343900843957e92b12b46b71bb.eot"); src: url("//db.onlinewebfonts.com/t/f60a44343900843957e92b12b46b71bb.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/f60a44343900843957e92b12b46b71bb.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/f60a44343900843957e92b12b46b71bb.woff") format("woff"), url("//db.onlinewebfonts.com/t/f60a44343900843957e92b12b46b71bb.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/f60a44343900843957e92b12b46b71bb.svg#Bank Gothic") format("svg"); }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  body {
    font-family: "Bank Gothic";
    font-weight: 300;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <FavoriteContextProvider>
          <Component {...pageProps} />
        </FavoriteContextProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
