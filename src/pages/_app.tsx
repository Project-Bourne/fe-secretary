import React from 'react'
import { AppLayout } from '@/layout/index';
import '@/styles/globals.css'
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App({Component, pageProps, ...appProps}) {

    const isLayoutNeeded = appProps.router.pathname.includes("/auth");

    const LayoutWrapper = !isLayoutNeeded ? AppLayout : React.Fragment;

  return (
    <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    
    </PersistGate>
  </Provider>

  )
}

export default App