const db = require('../config/db');

exports.getRestaurants = (req, res) => {
  db.query('SELECT * FROM restoran', (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.getRestaurantMenus = (req, res) => {
  const restaurantId = req.params.id;

  const sql = 'SELECT * FROM menu WHERE id_restoran = ?';

  db.query(sql, [restaurantId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.createRestaurant = (req, res) => {
  const {
    nama_restoran,
    alamat,
    kategori,
    jam_operasional,
    foto_restoran
  } = req.body;

  const sql = `
    INSERT INTO restoran
    (
      nama_restoran,
      alamat,
      kategori,
      jam_operasional,
      foto_restoran
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nama_restoran,
      alamat,
      kategori,
      jam_operasional,
      foto_restoran
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: 'Restaurant created',
        id: result.insertId
      });
    }
  );
};

exports.updateRestaurant = (req, res) => {
  const restaurantId = req.params.id;

  const {
    nama_restoran,
    alamat,
    kategori,
    jam_operasional,
    foto_restoran,
    status_buka
  } = req.body;

  const sql = `
    UPDATE restoran
    SET
      nama_restoran = ?,
      alamat = ?,
      kategori = ?,
      jam_operasional = ?,
      foto_restoran = ?,
      status_buka = ?
    WHERE id_restoran = ?
  `;

  db.query(
    sql,
    [
      nama_restoran,
      alamat,
      kategori,
      jam_operasional,
      foto_restoran,
      status_buka,
      restaurantId
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: 'Restaurant updated'
      });
    }
  );
};

exports.deleteRestaurant = (req, res) => {
  const restaurantId = req.params.id;

  const sql = 'DELETE FROM restoran WHERE id_restoran = ?';

  db.query(sql, [restaurantId], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: 'Restaurant deleted'
    });
  });
};