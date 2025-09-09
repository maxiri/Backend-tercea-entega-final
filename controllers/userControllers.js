let users = [];

export const registerUser = (req, res) => {
  const { email, password } = req.body;
  const userExists = users.find(u => u.email === email);
  if (userExists) return res.status(400).json({ message: "Usuario ya registrado" });

  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Credenciales inválidas" });
  res.json({ message: "Login exitoso", user });
};
