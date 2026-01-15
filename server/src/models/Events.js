const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    organizer: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["upcoming", "completed", "cancelled"],
        default: "upcoming",
    },  
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
        },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        },
    deletedAt: {
        type: Date
        }
    }, 
    {
    timestamps: true,
    }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
