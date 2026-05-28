const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const {
    nama,
    email,
    password,
    no_hp,
    alamat
  } = req.body;

  const checkSql = 'SELECT * FROM pelanggan WHERE email = ?';

  db.query(checkSql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length > 0) {
      return res.status(400).json({
        message: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO pelanggan (nama, email, no_hp, alamat, password_hash) VALUES (?, ?, ?, ?, ?)';

    db.query(
      sql,
      [
        nama,
        email,
        no_hp,
        alamat,
        hashedPassword
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          message: 'Register success'
        });
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM pelanggan WHERE email = ?';

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const user = result[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        message: 'Wrong password'
      });
    }

    const token = jwt.sign(
      {
        id: user.id_pelanggan,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    res.json({
      message: 'Login success',
      token,
      user: {
        id: user.id_pelanggan,
        nama: user.nama,
        email: user.email,
        role: user.role
      }
    });
  });
};
