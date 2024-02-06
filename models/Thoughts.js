const { Schema, model, default: mongoose, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get:(date)=>{
                return date.toISOString().split("T")[0]
            }
            //Use a getter method to format the timestamp on query
        },

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // id: false,
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Use a getter method to format the timestamp on query
            get:(date)=>{
                return date.toISOString().split("T")[0]
            }
        },
        username: {
            type: String,
            required: true,
        },
        reaction: [reactionSchema],

    },
    {   
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true
        },
        // id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reaction.length;
})


const Thought = model('Thought', thoughtSchema);
module.exports = Thought