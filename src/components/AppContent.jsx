import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";
import routes from "../routes";
// eslint-disable-next-line
const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map(
            (route, idx) =>
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={route.element}
                />
              )
          )}
          <Route
            path="/Admin-dashboard"
            element={<Navigate to="/Admin-dashboard" replace />}
          />
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};
// eslint-disable-next-line
export default React.memo(AppContent);
