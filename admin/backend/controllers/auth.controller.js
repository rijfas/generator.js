export const login = (req, res) => {
  const { username, password } = req.body;
  // Implement your authentication logic here
  res.json({ token: 'sample-token' });
};