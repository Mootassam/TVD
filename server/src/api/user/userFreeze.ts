import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import VipServices from '../../services/vipServices';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.categoryEdit,
    );

    // `frozen` defaults to true (freeze) when not provided; pass false to unfreeze.
    const frozen = req.body?.frozen !== false;

    const payload = await new VipServices(req).freezeClient(
      req.params.id,
      frozen,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
