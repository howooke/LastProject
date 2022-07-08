const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose)

const { Schema } = mongoose;
const studySchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    password: {
        type: Number,
        require: true
    },
    content: {
        type: String,
    },
    date: {
        type: String,
    },
    tagName: {
        type: Array,
        require: true,
    },
    roomId: {
        type: Number,
        unique: true,
    },
    word: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    groupNum: {
        type: Number,
        default: 0
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    
});

studySchema.plugin(AutoIncrement, { start_seq: 1, inc_field: "roomId" })
const Room = mongoose.model("Room", studySchema)
module.exports = {Room};
