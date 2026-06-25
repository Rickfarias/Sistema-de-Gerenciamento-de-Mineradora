import React from 'react';
import { Link } from 'react-router-dom';

const cards = [
  { to: '/cidades', label: 'Cidades', icon: '🏙', desc: 'Gerencie as cidades cadastradas' },
  { to: '/equipamentos', label: 'Equipamentos', icon: '⚙️', desc: 'Controle o parque de equipamentos' },
  { to: '/funcionarios', label: 'Funcionários', icon: '👷', desc: 'Gerencie a equipe de trabalho' },
  { to: '/servicos', label: 'Serviços', icon: '🔧', desc: 'Acompanhe as ordens de serviço' },
];

export default function Inicio() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Sistema Integrado da Mineradora</h1>
      <p style={styles.subtitle}>Utilize o menu ou os atalhos abaixo para navegar.</p>
      <div style={styles.grid}>
        {cards.map((card) => (
          <Link key={card.to} to={card.to} style={styles.card}>
            <span style={styles.icon}>{card.icon}</span>
            <strong style={styles.cardTitle}>{card.label}</strong>
            <span style={styles.cardDesc}>{card.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: '48px 32px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    fontSize: '28px',
    marginBottom: '8px',
    color: '#1a1a2e',
  },
  subtitle: {
    color: '#666',
    marginBottom: '40px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '28px 16px',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    textDecoration: 'none',
    color: '#1a1a2e',
    backgroundColor: '#fff',
    transition: 'box-shadow 0.2s, transform 0.2s',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '36px',
  },
  cardTitle: {
    fontSize: '15px',
  },
  cardDesc: {
    fontSize: '12px',
    color: '#888',
    textAlign: 'center',
  },
};
