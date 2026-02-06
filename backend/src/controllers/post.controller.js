import {Post} from "../models/post.model.js";

const createPost = async (req, res) => {
    try {
        const {name, description, age} = req.body;
        //basic validation
        if(!name || !description || !age){
            return res.status(400).json({message:"All fields are required"});
        
        }
        //create post
        const post = await Post.create({
            name,
            description,
            age
        });
        res.status(201).json({message:"Post created successfully", post:{_id:post._id, name:post.name, description:post.description, age:post.age} });
    }catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({message:"Internal server error"});
    }  
}

//get all posts
const getAllPosts = async(req, res)=>{
    try{
        const posts = await Post.find({});
        res.status(200).json({message:"Posts retrieved successfully", posts});

    }catch(error){
        console.error("Error retrieving posts:", error);
        return res.status(500).json({message:"Internal server error"});
    }

}

const updatePost = async(req, res)=>{
    try {
        //basic validation
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message:"No fields to update"});
        }
        const postId = req.params.id;
        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {new:true, runValidators:true});
        if(!updatedPost){
            return res.status(404).json({message:"Post not found"});
        }
        res.status(200).json({message:"Post updated successfully", post:updatedPost});
    } catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}

const deletePost = async(req, res)=>{
    try {
        const postId = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(postId);
        if(!deletedPost){
            return res.status(404).json({message:"Post not found"});
        }
        res.status(200).json({message:"Post deleted successfully", post:deletedPost});
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export {createPost, getAllPosts, updatePost, deletePost};