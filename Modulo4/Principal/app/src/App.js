import React from 'react';
import { BrowserRouter } from "react-router-dom"

import "./config/reactotron"
import { Provider } from "react-redux"
import { GlobalStyle } from "./styles/global"

import Sidebar from "./components/Sidebar"
import Player from "./components/Player"
import Header from "./components/Header"
import ErrorBox from "./components/ErrorBox"

import { Wrapper, Container, Content } from "./styles/components"

import Routes from "./routes"
import store from "./store"

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <Wrapper>
          <Container>
            <Sidebar />
            <Content>
              <ErrorBox />
              <Header />
              <Routes />
            </Content>
          </Container>
          <Player />
        </Wrapper>
      </BrowserRouter>
    </Provider>
  );
}

export default App;