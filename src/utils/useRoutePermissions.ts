import { useLocation } from "react-router-dom";
import { useAppSelector } from "./useRedux";

interface PermissionType {
  delete: boolean;
  edit: boolean;
  create: boolean;
  routeName: string;
}

const useRoutePermissions = () => {
  const currentPath = `/${useLocation().pathname.split("/")[1]}`.toLowerCase();
  const sidebar = useAppSelector((state) => state.Auth.sidebar?.sidemenu);
  let permissionData = sidebar?.find(
    (item) => item.path.toLowerCase() === currentPath
  )?.permission;
  if(permissionData===undefined){
  permissionData=  sidebar?.find(
      (item) => item.path.toLowerCase() === '/users'
    )?.submenus?.find(
      (item) => item.path.toLowerCase() === currentPath
    )?.permission;
  }
  const allowedPermission: PermissionType = {
    delete: Boolean(permissionData?.delete),
    edit: Boolean(permissionData?.update),
    create: Boolean(permissionData?.create),
    routeName: permissionData?.moduleName ?? "",
  };
  return allowedPermission;
};

export { useRoutePermissions };
