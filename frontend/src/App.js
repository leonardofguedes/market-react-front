import React, { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./views/app-views/home/index";
import Login from "./views/app-views/login";
import { AuthProvider } from "./context/auth";

const Contact = lazy(() => import("./views/app-views/contact/index"));
const ViewsApp = lazy(() => import("./views/index"));
const Payment = lazy(() => import("./views/app-views/payment/index"));

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewsApp />}>
            <Route
              path=""
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="contact"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="duvidas"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="login"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="payment"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Payment />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
