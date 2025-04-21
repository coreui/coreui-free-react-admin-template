import { useSelector } from 'react-redux';

const ProtectedComponent = ({ actionName, children }) => {
  const currentUser = useSelector((state) => state.auth.user);

  if (!actionName) {
    return null; // Do not render anything if no action is specified
  }

  const hasPermission = checkUserPermission(currentUser, actionName);

  return hasPermission ? children : null;
};

// Helper function to check user permissions
const checkUserPermission = (user, actionName) => {
  if (!user?.role?.actions?.length) {
    return false;
  }

  return user.role.actions.some((action) => action.name === actionName);
};

export default ProtectedComponent;
