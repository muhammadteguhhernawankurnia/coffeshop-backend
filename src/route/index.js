const express = require("express");
const router = express();

//import route
const productRoute = require("./product.route");
//end import route

router.get("/", (req, res) => {
  return res.send("backend for coffee shop");
});
// router use sama dengan get kurang lebih
router.use("/products", productRoute);
//router.use('/users', userRoute) nanti bikin sendiri

module.exports = router;
// agar bisa dipake dipanggil keluar
