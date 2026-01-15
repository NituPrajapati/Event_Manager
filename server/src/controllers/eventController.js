const Event = require('../models/Events');

//CREATE EVENT
const createEvent = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const newEvent = new Event({
            ...req.body,
            createdBy: req.user.userId
        });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

// READ (All users)
const readAllEvents = async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
};

// READ (Specific user)
const readEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id); // find by id
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }                   
};
//UPDATE EVENT
const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//DELETE EVENT
const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndRemove(req.params.id);
        if (!deletedEvent){
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message }); 
        }
};

module.exports = {
    createEvent,
    readAllEvents,
    readEvent,
    updateEvent,
    deleteEvent,
};