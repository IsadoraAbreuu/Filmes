// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../services/auth'; 

const ProtectedRoute = ({ requiredRole }) => {
    const { isAuthenticated, role } = useAuth(); // Pega a autenticação e a role

    // 1. Sem Token (Não Autenticado)
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 2. Com Token, Checa Permissão (Autorização)
    if (requiredRole && role !== requiredRole && role !== 'admin') {
        // Se a rota requer 'admin', e o usuário é 'comum', nega o acesso.
        return <Navigate to="/" replace />; 
    }

    // Permitido
    return <Outlet />;
};