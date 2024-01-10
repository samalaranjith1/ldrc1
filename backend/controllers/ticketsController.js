const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const tickets = require("../models/tickets");

const addTicket = asyncWrapper(async (req, res) => {
  const ticket = await tickets.create(req.body.formData);
  res.status(201).json({ data: ticket });
});

const getUserTickets = asyncWrapper(async (req, res, next) => {
  const { searchId } = req.params;
  try {
    const task = await tickets.find({ email: searchId });
    if (!task) {
      return next(
        createCustomError(`No ticket details for user id : ${searchId}`, 404)
      );
    }
    res.status(200).json({ data: task });
  } catch (error) {
    console.log(error);
  }
});

const getTicketDetails = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await tickets.findOne({ _id: id });
    if (!task) {
      return next(
        createCustomError(`No ticket details with ticket id : ${searchId}`, 404)
      );
    }
    res.status(200).json({ data: task });
  } catch (error) {
    console.log(error);
  }
});

const updateTicket = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const data = { ...req.body.formData };

  const task = await tickets.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
    returnOriginal: false,
  });
  if (!task) {
    return next(
      createCustomError(`No tickets details with ticcket id : ${searchId}`, 404)
    );
  }

  res.status(200).json({ data: task });
});

const deleteTicket = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await tickets.findOneAndDelete({ _id: id });
  if (!task) {
    return next(createCustomError(`No task with ticket id : ${id}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  addTicket,
  getUserTickets,
  getTicketDetails,
  updateTicket,
  deleteTicket,
};
