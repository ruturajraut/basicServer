import mongoose , {Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minLength:1,
        maxLength:30,
    },
    password:{
        type:String,
        required:true,
        minLength:3,
        maxLength:100,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },


},
{    timestamps:true,
});

//before save any password we will hash it
userSchema.pre("save", async function(){
    //only hash the password if it has been modified or is new
    if(!this.isModified("password")){
        return;
    }  

    this.password = await bcrypt.hash(this.password, 10);
});

//method to compare password
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model("User", userSchema);
