import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';

import Login from './pages/Login/Login';
import CadastrarUsuarios from './pages/Cadastro';
import Inicio from './pages/Inicio';
import Equipamentos from './pages/Equipamentos/Equipamento';
import Cidades from './pages/Cidades/Cidades';
import Funcionarios from './pages/Funcionarios/Funcionarios';
import Servicos from './pages/Servicos/Servicos';

import Menu from './components/Menu';

function RotaPrivada({ children, session }) {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Menu />
      <hr />
      {children}
    </div>
  );
}

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* ROTA ADICIONADA: Direciona quem acessar a raiz do projeto para o login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route 
          path="/login" 
          element={session ? <Navigate to="/inicio" replace /> : <Login />} 
        />
        
        <Route 
          path="/cadastro" 
          element={session ? <Navigate to="/inicio" replace /> : <CadastrarUsuarios />} 
        />

        <Route 
          path="/inicio" 
          element={
            <RotaPrivada session={session}>
              <Inicio />
            </RotaPrivada>
          } 
        />
        <Route 
          path="/equipamentos" 
          element={
            <RotaPrivada session={session}>
              <Equipamentos />
            </RotaPrivada>
          } 
        />
        <Route 
          path="/cidades" 
          element={
            <RotaPrivada session={session}>
              <Cidades />
            </RotaPrivada>
          } 
        />
        <Route 
          path="/funcionarios" 
          element={
            <RotaPrivada session={session}>
              <Funcionarios />
            </RotaPrivada>
          } 
        />
        <Route 
          path="/servicos" 
          element={
            <RotaPrivada session={session}>
              <Servicos />
            </RotaPrivada>
          } 
        />

        <Route path="*" element={<Navigate to={session ? "/inicio" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;