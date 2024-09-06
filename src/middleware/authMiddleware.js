import jwt from 'jsonwebtoken';

// Middleware d'authentification
export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); // Passer à la prochaine middleware ou route
  } catch (error) {
    res.status(400).json({ message: 'Token invalide.' });
  }
};
