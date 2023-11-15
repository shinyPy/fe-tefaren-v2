const PrivateRoute = ({ element, element2, allowedRoles }) => {
  const userRole = localStorage.getItem("user_role");

  if (userRole && allowedRoles.includes(userRole)) {
    return element;
  } else {
    return element2;
  }
};

export default PrivateRoute;
