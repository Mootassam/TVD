
import { Redirect, Route } from "react-router-dom";
import permissionCheker from "../../../modules/auth/permissionChecker";
import ScrollToTop from "src/view/layout/ScrollToTop";

function RoutesWihoutMenue({
  component: Component,
  currentTenant,
  currentUser,
  ...reset
}) {
  return (
    <Route
      {...reset}
      render={(props) => {
        // Real accounts awaiting admin approval can't access the platform yet.
        if (
          currentUser &&
          currentUser.accountType !== 'demo' &&
          currentUser.approved === false
        ) {
          return <Redirect to="/auth/pending-approval" />;
        }

        return (
          <>
          <ScrollToTop />
            <Component {...props} />
          </>
        );
      }}
    />
  );
}

export default RoutesWihoutMenue;
