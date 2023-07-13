const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    img:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type: String,
        required: true
    },
},{timestamps:true})


const Blog = new mongoose.model('Blog',blogSchema);
module.exports = Blog;