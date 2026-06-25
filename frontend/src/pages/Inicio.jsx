import React from 'react';

export default function Inicio() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Sistema Integrado da Mineradora</h1>
      <p style={styles.subtitle}>Bem-vindo ao painel de controle. Utilize o menu acima para navegar.</p>
    </div>
  );
}

const styles = {
  page: {
    padding: '48px 0',
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    fontSize: '28px',
    marginBottom: '8px',
    color: '#545465',
  },
  subtitle: {
    color: '#666',
  },
};