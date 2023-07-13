const { blogSchema } = require('./schemas');
const Blog = require('./model/blog');

module.exports.validateBlog = (req,res,next) =>{
    const { title,img,content } = req.body;
    const { error } = blogSchema.validate({ title,img,content });

    if (error) {
        const msg = error.details.map((err)=>err.message).join(',')
        req.flash('error',msg);
        res.redirect('/blogs/create');
    }
    next();
}

module.exports.isLoggedIn = (req,res,next) =>{
    if (!req.isAuthenticated()) {
        req.flash('error', 'You need to login!');
        return res.redirect('/blogs/login');
    }
    next();
} 

module.exports.isAuthor = async(req,res,next) =>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(blog.author !== req.user.username){
        req.flash('error','You do not have required permission');
        return res.redirect(`/blogs/${id}/read`);
    }
    next();
}