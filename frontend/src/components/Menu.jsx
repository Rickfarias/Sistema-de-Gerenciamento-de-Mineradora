import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <nav>
      {/* Troque seus botões antigos por Links: */}
      <Link to="/inicio">Início</Link> | 
      <Link to="/equipamentos">Equipamentos</Link> | 
      <Link to="/cidades">Cidades</Link> | 
      <Link to="/funcionarios">Funcionários</Link> | 
      <Link to="/servicos">Serviços</Link>
    </nav>
  );
}