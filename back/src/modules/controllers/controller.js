const Data = require("../../db/schema")
const fs = require("fs/promises")

module.exports.getAll = async (req, res) => {
    const allData = await Data.find()
    res.send({data : allData})
}

module.exports.getAllData = async (req, res) => {
    let data = await fs.readFile("array.json", "utf8")
    res.send({data})
}

module.exports.createData = async (req, res) => {
    try {
        const {sortBy, searchText, sortDir, searchResult} = req.body
        const changeData = await Data.findOneAndUpdate({sortBy,searchText,sortDir} , {searchResult})
        console.log(changeData)
        if (!changeData) {
            await Data.create({sortBy, searchText, sortDir, searchResult})
        }
        res.send({data: {success : true}})
    } catch (err) {
        new Error(err)
    }
}