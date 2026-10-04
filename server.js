import express from 'express';
import { randomBytes, scryptSync, timingSafeEqual, randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  initialBeauticians,
  initialPosts,
  initialBrands,
  initialBookings,
  initialProducts,
  initialProductOrders
} from './src/data/mockData.js';

const app = express();
const PORT = process.env.PORT || 3001;
const dataDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), 'src', 'data');
const accountsFile = path.join(dataDirectory, 'accounts.json');

const readAccounts = () => {
  if (!existsSync(accountsFile)) return [];
  return JSON.parse(readFileSync(accountsFile, 'utf8'));
};

const saveAccounts = (accounts) => {
  mkdirSync(dataDirectory, { recursive: true });
  writeFileSync(accountsFile, JSON.stringify(accounts, null, 2), { mode: 0o600 });
};

const publicAccount = ({ passwordHash, passwordSalt, ...account }) => account;

const hashPassword = (password, salt = randomBytes(16).toString('hex')) => ({
  salt,
  hash: scryptSync(password, salt, 64).toString('hex')
});

const state = {
  beauticians: [...initialBeauticians],
  posts: [...initialPosts],
  brands: [...initialBrands],
  bookings: [...initialBookings],
  products: [...initialProducts],
  productOrders: [...initialProductOrders]
};

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Glow backend is running' });
});

app.post('/api/accounts', (req, res) => {
  const { name, email, password, role } = req.body || {};
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const allowedRoles = ['customer', 'beautician', 'shop_owner'];

  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 80) {
    return res.status(400).json({ message: 'Enter a name between 2 and 80 characters.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || normalizedEmail.length > 254) {
    return res.status(400).json({ message: 'Enter a valid email address.' });
  }
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    return res.status(400).json({ message: 'Password must be between 8 and 128 characters.' });
  }
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Choose a valid account type.' });
  }

  const accounts = readAccounts();
  if (accounts.some((account) => account.email === normalizedEmail)) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const { salt, hash } = hashPassword(password);
  const account = {
    id: randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    role,
    passwordSalt: salt,
    passwordHash: hash,
    createdAt: new Date().toISOString()
  };

  saveAccounts([...accounts, account]);
  return res.status(201).json({ account: publicAccount(account) });
});

app.post('/api/accounts/login', (req, res) => {
  const { email, password } = req.body || {};
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const account = readAccounts().find((item) => item.email === normalizedEmail);

  if (
    !account ||
    typeof password !== 'string' ||
    password.length > 128 ||
    !timingSafeEqual(
      Buffer.from(hashPassword(password, account.passwordSalt).hash, 'hex'),
      Buffer.from(account.passwordHash, 'hex')
    )
  ) {
    return res.status(401).json({ message: 'Email or password is incorrect.' });
  }

  return res.json({ account: publicAccount(account) });
});

app.get('/api/beauticians', (_req, res) => {
  res.json(state.beauticians);
});

app.get('/api/posts', (_req, res) => {
  res.json(state.posts);
});

app.get('/api/brands', (_req, res) => {
  res.json(state.brands);
});

app.get('/api/bookings', (_req, res) => {
  res.json(state.bookings);
});

app.get('/api/products', (_req, res) => {
  res.json(state.products);
});

app.get('/api/product-orders', (_req, res) => {
  res.json(state.productOrders);
});

app.post('/api/bookings', (req, res) => {
  const booking = req.body;

  if (!booking || !booking.id) {
    return res.status(400).json({ message: 'Booking payload is missing an id.' });
  }

  state.bookings = [booking, ...state.bookings];
  return res.status(201).json(booking);
});

app.post('/api/products', (req, res) => {
  const product = req.body;

  if (!product || !product.id) {
    return res.status(400).json({ message: 'Product payload is missing an id.' });
  }

  state.products = [product, ...state.products];
  return res.status(201).json(product);
});

app.post('/api/product-orders', (req, res) => {
  const order = req.body;

  if (!order || !order.id) {
    return res.status(400).json({ message: 'Order payload is missing an id.' });
  }

  state.productOrders = [order, ...state.productOrders];
  return res.status(201).json(order);
});

app.post('/api/posts', (req, res) => {
  const post = req.body;

  if (!post || !post.id) {
    return res.status(400).json({ message: 'Post payload is missing an id.' });
  }

  state.posts = [post, ...state.posts];
  return res.status(201).json(post);
});

app.patch('/api/bookings/:id', (req, res) => {
  const booking = state.bookings.find((item) => item.id === req.params.id);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found.' });
  }

  state.bookings = state.bookings.map((item) =>
    item.id === req.params.id ? { ...item, ...req.body } : item
  );

  return res.json(state.bookings.find((item) => item.id === req.params.id));
});

app.patch('/api/product-orders/:id', (req, res) => {
  const order = state.productOrders.find((item) => item.id === req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found.' });
  }

  state.productOrders = state.productOrders.map((item) =>
    item.id === req.params.id ? { ...item, ...req.body } : item
  );

  return res.json(state.productOrders.find((item) => item.id === req.params.id));
});

app.delete('/api/products/:id', (req, res) => {
  const productExists = state.products.some((item) => item.id === req.params.id);

  if (!productExists) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  state.products = state.products.filter((item) => item.id !== req.params.id);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Glow backend listening on http://localhost:${PORT}`);
});
