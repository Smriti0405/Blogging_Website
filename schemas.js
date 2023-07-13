const Joi = require('joi');

module.exports.blogSchema = Joi.object({
    title: Joi.string().required(),
    img: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().required()
});