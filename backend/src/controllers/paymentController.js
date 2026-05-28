const db = require('../config/db');

exports.createPayment = (req, res) => {
  const {
    id_pesanan,
    id_metode,
    jumlah_bayar,
    provider,
    nomor_rekening,
    nama_akun
  } = req.body;

  const sql = `
    INSERT INTO pembayaran
    (
      id_pesanan,
      id_metode,
      jumlah_bayar,
      status_pembayaran
    )
    VALUES (?, ?, ?, 'menunggu')
  `;

  db.query(
    sql,
    [
      id_pesanan,
      id_metode,
      jumlah_bayar
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      const paymentId = result.insertId;

      if (provider || nomor_rekening || nama_akun) {
        const detailSql = `
          INSERT INTO detail_pembayaran
          (
            id_pembayaran,
            provider,
            nomor_rekening,
            nama_akun
          )
          VALUES (?, ?, ?, ?)
        `;

        db.query(
          detailSql,
          [
            paymentId,
            provider,
            nomor_rekening,
            nama_akun
          ],
          (detailErr) => {
            if (detailErr) {
              return res.status(500).json(detailErr);
            }

            res.json({
              message: 'Payment created',
              payment_id: paymentId
            });
          }
        );
      } else {
        res.json({
          message: 'Payment created',
          payment_id: paymentId
        });
      }
    }
  );
};

exports.getPaymentByOrder = (req, res) => {
  const orderId = req.params.orderId;

  const sql = `
    SELECT *
    FROM pembayaran
    WHERE id_pesanan = ?
  `;

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.updatePaymentStatus = (req, res) => {
  const paymentId = req.params.id;

  const {
    status_pembayaran
  } = req.body;

  const sql = `
    UPDATE pembayaran
    SET status_pembayaran = ?
    WHERE id_pembayaran = ?
  `;

  db.query(
    sql,
    [
      status_pembayaran,
      paymentId
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: 'Payment status updated'
      });
    }
  );
};