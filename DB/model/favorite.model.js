import mongoose,{Schema,model,Types} from 'mongoose' 
const favoriteSchema = new Schema({

    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,
    },
   
   animes:[{
   animeId:{type:Types.ObjectId,ref:'Anime',required:true}, 
   }],
},
{
    timestamps:true,
}
);
const favoriteModel = mongoose.models.Favorite ||  model('Favorite',favoriteSchema);
export default favoriteModel;