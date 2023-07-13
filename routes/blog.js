const Blog = require('../model/blog');
const User = require('../model/user');
const express = require('express');
const router = express.Router();
const { isLoggedIn,validateBlog,isAuthor } = require('../middleware');

router.get('/blogs',async(req,res)=>{
    try{
        const blogs = await Blog.find();
         res.render('home',{ blogs });
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

router.get('/blogs/:id/read', async(req,res)=>{
    try{
        const { id } = req.params;
        const blog = await Blog.findById(id);
        const writer = blog.author;
        const user = await User.findOne({ username: writer });
        // console.log(user);
        res.render('show',{ blog,user });
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

router.get('/blogs/create',isLoggedIn,async(req,res)=>{
    res.render('create');
})

router.post('/blogs',async(req,res)=>{
    try{
        const { author,title,img,content } = req.body;
        await Blog.create({author,title,img,content});
        req.flash('success','Blog created successfully')
        res.redirect('/blogs');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

router.get('/blogs/:id/edit',isLoggedIn,isAuthor,async(req,res)=>{
    try{
        const { id } = req.params;
        const blog = await Blog.findById(id);
        res.render('edit',{ blog });
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

router.patch('/blogs/:id',isLoggedIn,isAuthor,async(req,res)=>{
    try{
        const { id } = req.params;
        const { title,img,content } = req.body;
        await Blog.findByIdAndUpdate(id,{ title,img,content });
        
        req.flash('success','Blog edited successfully')
        res.redirect(`/blogs/${id}/read`);
    }
    catch{
        res.status(500).render('error',{err:e.message});
    }
})

router.delete('/blogs/:id/delete',isLoggedIn,isAuthor,async(req,res)=>{
    try{
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        req.flash('success','Blog deleted!')
        res.redirect('/blogs')
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

module.exports = router;