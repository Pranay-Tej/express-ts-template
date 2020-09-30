import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    date: {
        type: Date,
        default: Date.now,
    }
});


const ArticleModel = mongoose.model("Article", ArticleSchema)

export default ArticleModel;

