const express = require("express");
const router = express.Router();
const {
  addTicket,
  getTicketDetails,
  updateTicket,
  deleteTicket,
  getUserTickets,
} = require("../controllers/ticketsController");

const authMiddleware = require("../middleware/auth");

router.route("/").post(addTicket);
router.route("/:searchId").get(authMiddleware, getUserTickets);

router
  .route("/:userEmail/:ticketId")
  .get(authMiddleware, getTicketDetails)
  .patch(authMiddleware, updateTicket)
  .delete(authMiddleware, deleteTicket);

module.exports = router;
