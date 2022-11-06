const mongoose = require("mongoose")
const {Schema} = mongoose

const dataSchema = new Schema({
    sortBy: String,
    searchText: String,
    sortDir: String,
    searchResult: String
})

module.exports = Data = mongoose.model("data", dataSchema  )