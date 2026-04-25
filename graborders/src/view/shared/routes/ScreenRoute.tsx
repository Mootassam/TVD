import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import permissionCheker from "../../../modules/auth/permissionChecker";
import kycSelectors from "src/modules/kyc/list/kycListSelectors";

function ScreenRoute({ component: Component, currentTenant, currentUser, requiresKyc, ...rest }) {
  const location = useLocation();
  const kycStatus = useSelector(kycSelectors.selectKycStatus);

  return (
    <Route
      {...rest}
      render={(props) => {
        const permissionChecker = new permissionCheker(currentUser, currentTenant);
        if (!permissionChecker.isAuthenticated) {
          return (
            <Redirect
              to={{ pathname: "/get-started", state: { from: location } }}
            />
          );
        }

        // Check KYC if required
        if (requiresKyc && kycStatus !== 'success') {
          return (
            <Redirect
              to={{
                pathname: "/kyc-status",
                state: {
                  from: location,
                  requiredKyc: true,
                  currentStatus: kycStatus,
                },
              }}
            />
          );
        }

        return (
          <div className="children__content">
            <Component {...props} />
          </div>
        );
      }}
    />
  );
}

export default ScreenRoute;
