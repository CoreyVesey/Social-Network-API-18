const User = require("../models/User");

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch(err) {
            res.status(500).json(err)
        }
    },

    async getUser(req, res) {
        try {
            const user = await User.findOne({_id:req.params.userId}).select("-__v");
            if (!user) {
                return res.status(404).json({ message: "No user found with that id"});
            }
            res.json(user);
        } catch(err) {
            res.status(500).json(err)
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const changeUser = await User.findOneAndUpdate({ _id:req.params.userId }, req.body, { runValidators: true, new: true });
            if (!changeUser) {
                return res.status(404).json({ message: "No user found with that id" })
            }
            res.json(changeUser);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const deletePerson = await User.findOneAndDelete({ _id:req.params.userId });
            if (!deletePerson) {
                return res.status(404).json({ message: "No user found with that id" });
            }
            res.json(deletePerson);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const hiFelicia = await User.findOneAndUpdate({ _id:req.params.userId}, { $addToSet: { friends: req.params.friendId }});
            if (!hiFelicia) {
                return res.status(404).json({ message: "No friend found with that id" });
            }
            res.json(hiFelicia);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const byeFelicia =  await User.findOneAndUpdate({ _id:req.userId }, { $pull: {friends: req.params.friendId }});
            if (!byeFelicia) {
                return res.status(404).json({ message: "No friend found with that id" });
            }
            res.json(byeFelicia);
        } catch(err) {
            res.status(500).json(err);
        }
    }
}

