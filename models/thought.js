const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
        minLength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        reactionSchema
    ]
});

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
        minLength: 1
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);
module.exports = Thought;