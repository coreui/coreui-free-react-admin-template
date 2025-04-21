// utils/permissions.js
export const checkUserPermission = (user, path, actionName) => {
    const defaultAccessiblePaths = ['/dashboard','/profile'];
    if (defaultAccessiblePaths.includes(path)) {
        return true; 
      }
    if (!user?.role?.actions) return false;
  
    if (actionName) {
       
      return user.role.actions.some(action => action.name === actionName);
    }
  
   return false;
  };
  
  export const filterAccessibleRoutes = (routes, user) => {
    return routes.filter(route => 
      checkUserPermission(
        user,
        route.path,
        route.permissions?.actionName
      )||checkUserPermission(  user,
        route.path,
        route.permissions?.actionName2)
    );
  };
  
  export const filterAccessibleNavItems = (navItems, user) => {
    return navItems
      .map(item => {
        if (item.items) {
        
          const filteredItems = filterAccessibleNavItems([...item.items], user);
          return filteredItems.length > 0 ? { ...item, items: filteredItems } : null;
        }
        return checkUserPermission(user, item.to, item.permissions?.actionName) ||
               checkUserPermission(user, item.to, item.permissions?.actionName2)
          ? { ...item }  
          : null;
      })
      .filter(Boolean);
  };
  
  