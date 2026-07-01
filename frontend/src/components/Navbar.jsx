
const links = [
  { id: 'inicio', label: 'Início' },
  { id: 'cidades', label: 'Cidades' },
  { id: 'equipamentos', label: 'Equipamentos' },
  { id: 'funcionarios', label: 'Funcionários' },
  { id: 'servicos', label: 'Serviços' },
];

export default function Navbar({ pagina, setPagina }) {
  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>Mineradora</span>
      <div style={styles.links}>
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => setPagina(link.id)}
            style={{ ...styles.link, ...(pagina === link.id ? styles.active : {}) }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a2e',
    padding: '0 32px',
    height: '60px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    color: '#e2b96f',
    fontWeight: 'bold',
    fontSize: '18px',
    letterSpacing: '0.5px',
  },
  links: {
    display: 'flex',
    gap: '8px',
  },
  link: {
    color: '#5f5f8f',
    background: 'none',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  active: {
    backgroundColor: '#e2b96f22',
    color: '#e2b96f',
    fontWeight: '600',
  },
};
