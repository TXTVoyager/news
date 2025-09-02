import React from "react";
import { CFooter } from "@coreui/react";
const AppFooter = () => {
  return (
    <CFooter className="row text-center">
      <div>
        <span className="text-center ms-1">www.txtviews.com </span> <br/>
        <span className="text-center me-1"> Developed By TXTVIEWS </span>
      </div>
    </CFooter>
  );
};
export default React.memo(AppFooter);
