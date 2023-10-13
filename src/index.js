import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RequireAuth from "./components/RequireAuth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import App from "./App";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initalState";
import reducer from "./context/reducer";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import Scanner from "./components/Scanner";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const queryClient = new QueryClient()
ReactDOM.render(
  <AuthProvider>

  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
    <Routes>
          <Route
            path="/*"
            element={
               <RequireAuth>
                <App loading={true}/>
               </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/scannerr" element={<Scanner/>}/>
        </Routes>
    </StateProvider>
  </Router>

  </AuthProvider>,
  document.getElementById("root")
);
