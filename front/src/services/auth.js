export const useAuth = () => {
    const role = localStorage.getItem('userRole'); 
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    
    const cleanRole = role ? role.trim() : null; 
    
    const isAuthenticated = !!token;
    const isAdmin = cleanRole === 'admin'; 

    console.log("Debug Auth:", cleanRole, isAdmin, name); // Debug útil
    
    return { isAuthenticated, role, isAdmin, name };;
};