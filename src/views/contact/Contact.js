import React from 'react'

export default function Contact() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Contact Us</h1>
        <p style={styles.text}>We’d love to hear from you! Reach out for support, feedback, or partnership opportunities.</p>
        
        <div style={styles.infoBox}>
          <h2 style={styles.label}>Email</h2>
          <p style={styles.value}>support@chorvoqgis.com</p>
        </div>

        <div style={styles.infoBox}>
          <h2 style={styles.label}>Phone</h2>
          <p style={styles.value}>+998 90 123 45 67</p>
        </div>

        <div style={styles.infoBox}>
          <h2 style={styles.label}>Address</h2>
          <p style={styles.value}>Tashkent, Uzbekistan</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#2c3e50',
  },
  text: {
    fontSize: '1rem',
    color: '#34495e',
    marginBottom: '1.5rem',
  },
  infoBox: {
    marginBottom: '1rem',
  },
  label: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  value: {
    fontSize: '1rem',
    color: '#7f8c8d',
  },
}
