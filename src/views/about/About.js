import React from 'react'

export default function About() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>About Chorvoq GIS</h1>
        <p style={styles.text}>
          Chorvoq GIS is a modern land management system built to visualize, organize, and track territorial information 
          through interactive maps. Whether you're a government agency allocating land or a business tracking territory usage, 
          Chorvoq GIS makes it simple, scalable, and visual.
        </p>
        <p style={styles.text}>
          The application allows users to draw shapes on maps, save layers, assign metadata, and more—all displayed clearly 
          within a user-friendly interface backed by powerful technologies like React, Spring Boot, PostgreSQL, and GeoServer.
        </p>
        <p style={styles.text}>
          Designed with simplicity and efficiency in mind, Chorvoq GIS helps bring transparency and control to land-based operations.
        </p>
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
    maxWidth: '800px',
    lineHeight: 1.6,
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#2c3e50',
  },
  text: {
    fontSize: '1rem',
    color: '#34495e',
    marginBottom: '1rem',
  },
}
