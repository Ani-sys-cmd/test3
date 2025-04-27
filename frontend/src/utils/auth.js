export const isAuthorized = (requiredRole) => {
    const role = localStorage.getItem("role");
    return role === requiredRole;
  };
  
  export const getUserRole = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null; // No token, user is not authenticated
  
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
    return decoded.role; // Return user role from token
  };
  