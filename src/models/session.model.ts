
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserDocument } from './user.model'
import { Session } from "inspector";

export interface SessionDocument extends mongoose.Document {
   user: UserDocument['_id'];
   valid: boolean;
   userAgent: string;
   createdAt: Date;
   updatedAt: Date;

}

const sessionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    valid: {type: Boolean, default: true},
    userAgent: {type: String}
},{
    timestamps:true
})

/** sessionSchema.pre("save", async function(next){
//     let user = this as SessionDocument;

//     if(!user.isModified('password')){
//         return next();
//     }

//     const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));

//     const hash = await bcrypt.hash(user.password, salt)

//     user.password = hash;

//     return next();
// }) **/

sessionSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;
    return await bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;