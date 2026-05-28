const db = require('../config/db');

exports.getMenus = (req, res) => {
  db.query('SELECT * FROM menu', (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
};

exports.getMenuById = (req, res) => {
  const menuId = req.params.id;
  const sql = 'SELECT * FROM menu WHERE id_menu = ?';
  db.query(sql, [menuId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
};

exports.createMenu = (req, res) => {
  const {
    id_restoran,
    nama_menu,
    deskripsi,
    harga,
    kategori_menu,
    foto_menu
  } = req.body;

  const sql = `
    INSERT INTO menu
    (
      id_restoran,
      nama_menu,
      deskripsi,
      harga,
      kategori_menu,
      foto_menu
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      id_restoran,
      nama_menu,
      deskripsi,
      harga,
      kategori_menu,
      foto_menu
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: 'Menu created',
        id: result.insertId
      });
    }
  );
};

exports.updateMenu = (req, res) => {
  const menuId = req.params.id;

  const {
    nama_menu,
    deskripsi,
    harga,
    kategori_menu,
    foto_menu,
    is_available
  } = req.body;

  const sql = `
    UPDATE menu
    SET
      nama_menu = ?,
      deskripsi = ?,
      harga = ?,
      kategori_menu = ?,
      foto_menu = ?,
      is_available = ?
    WHERE id_menu = ?
  `;

  db.query(
    sql,
    [
      nama_menu,
      deskripsi,
      harga,
      kategori_menu,
      foto_menu,
      is_available,
      menuId
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: 'Menu updated'
      });
    }
  );
};

exports.deleteMenu = (req, res) => {
  const menuId = req.params.id;
  const sql = 'DELETE FROM menu WHERE id_menu = ?';
  db.query(sql, [menuId], (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({
      message: 'Menu deleted'
    });
  });
};