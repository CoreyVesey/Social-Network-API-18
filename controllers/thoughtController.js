const { Thought, User } = require("../models");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async getThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id:req.params.thoughtId });
            if (!thought) {
                return res.status(400).json({ message: "No thought found with that id" });
            }
            res.json(thought);
        }catch(err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            res.json(newThought); 
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const changeThought = await Thought.findOneAndUpdate({ _id:req.params.thoughtId }, req.body, { runValidators: true, new: true });
            if (!changeThought) {
                return res.status(404).json({ message: "No thought found with that id" });
            }
            res.json(changeThought);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const deleteIdea = await Thought.findOneAndDelete({ _id:req.params.thoughtId });
            if (!deleteIdea) {
                return res.status(404).json({ message: "No thought found with that id" });
            }
            res.json(deleteIdea);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const newReaction = await Thought.findOneAndUpdate({ _id:req.params.thoughtId}, { $addToSet: { reactions:req.body}}, { runValidators: true, new: true });
            if (!newReaction) {
                return res.status(404).json({ message: "No reaction found with that id" });
            }
            res.json(newReaction);
        } catch(err) {
            res.status(500).json(err)
        }
    },

    async deleteReaction(req, res) {
        try {
            const destroyReaction = await Thought.findOneAndUpdate({ _id:req.params.thoughtId}, { $pull: {reactions: {reactionId: req.params.reactionId }}}, { runValidators: true, new: true });
            if (!destroyReaction) {
                return res.status(404).json({ message: "No reaction found with that id" });
            }
            res.json(destroyReaction);
        } catch(err) {
            res.status(500).json(err);
        }
    }
}