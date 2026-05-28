const db = require('../config/db');

exports.createOrder = (req, res) => {
  const {
    id_pelanggan,
    id_restoran,
    biaya_kirim,
    catatan,
    items
  } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      message: 'Items cannot be empty'
    });
  }

  let totalHarga = 0;

  const menuIds = items.map(item => item.menu_id);

  const menuSql = `
    SELECT id_menu, harga
    FROM menu
    WHERE id_menu IN (?)
  `;

  db.query(menuSql, [menuIds], (err, menus) => {
    if (err) {
      return res.status(500).json(err);
    }

    const menuMap = {};

    menus.forEach(menu => {
      menuMap[menu.id_menu] = menu.harga;
    });

    for (const item of items) {
      if (!menuMap[item.menu_id]) {
        return res.status(400).json({
          message: `Menu ID ${item.menu_id} not found`
        });
      }

      totalHarga += menuMap[item.menu_id] * item.quantity;
    }

    const orderSql = `
      INSERT INTO pesanan
      (
        id_pelanggan,
        id_restoran,
        status_pesanan,
        total_harga,
        biaya_kirim,
        catatan
      )
      VALUES (?, ?, 'menunggu_konfirmasi', ?, ?, ?)
    `;

    db.query(
      orderSql,
      [
        id_pelanggan,
        id_restoran,
        totalHarga,
        biaya_kirim,
        catatan
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        const orderId = result.insertId;

        items.forEach(item => {
          const hargaSatuan = menuMap[item.menu_id];
          const subtotal = hargaSatuan * item.quantity;

          const itemSql = `
            INSERT INTO detail_pesanan
            (
              id_pesanan,
              id_menu,
              jumlah,
              harga_satuan,
              subtotal,
              catatan_item
            )
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          db.query(itemSql, [
            orderId,
            item.menu_id,
            item.quantity,
            hargaSatuan,
            subtotal,
            item.catatan_item || null
          ]);
        });

        res.json({
          message: 'Order created',
          order_id: orderId,
          total_harga: totalHarga,
          biaya_kirim
        });
      }
    );
  });
};

exports.getOrderHistory = (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT *
    FROM pesanan
    WHERE id_pelanggan = ?
    ORDER BY waktu_pesan DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};