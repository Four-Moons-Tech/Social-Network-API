const { Schema, model, default: mongoose } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
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
            //Use a getter method to format the timestamp on query
        },

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);
reactionSchema.virtual('reactionCount').get(function(){
    return this.reaction.length;
})

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
        },
        username: {
            type: String,
            required: true,
        },
        reaction: [reactionSchema],

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);



const Thought = model('Thought', thoughtSchema);
module.exports = Thought