const express = require("express")
const router = express.Router()

const {
    getAllData,
    createData,
    getAll
} = require("../controllers/controller")

router.get("/all/data", getAllData)
router.get("/all", getAll)
router.post("/data", createData)

module.exports = router