app.post('/users', async (req, res) => {
  console.log('Request received:', req.body)
  const { name, email, role, country } = req.body
  try {
    const user = await User.create({ name, email, role, country })
    console.log('User created:', user)
    res.json(user)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(400).json({ error: error.message })
  }
})
