import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

// Create a new appointment
export const createAppointment = async (req, res) => {
  const { date, time, reason, receiverId } = req.body;

  try {
    const senderId = req.user.id; // Extract sender ID from authenticated user

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    const newAppointment = new Appointment({
      date,
      time,
      reason,
      sender: senderId,
      receiver: receiverId,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

// Get appointments for the authenticated user
export const getAppointments = async (req, res) => {
  const userId = req.user.id;

  try {
    const appointments = await Appointment.find({ $or: [{ sender: userId }, { receiver: userId }] })
      .populate('sender', 'username email')
      .populate('receiver', 'username email');

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// Update the status of an appointment
export const updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.receiver.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to update this appointment' });
    }      

    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: `Appointment ${status.toLowerCase()} successfully`, appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment status', error: error.message });
  }
};

// Get mentees assigned to a mentor
export const getAssignedMentees = async (req, res) => {
  try {
    const mentorId = req.user.id;

    const mentor = await User.findById(mentorId).populate('assignedMentees', 'username email');

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.status(200).json(mentor.assignedMentees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assigned mentees', error: error.message });
  }
};

// Get mentor assigned to a mentee
export const getAssignedMentor = async (req, res) => {
    try {
      const menteeId = req.user.id; // Use authenticated user's ID
  
      const mentee = await User.findById(menteeId).populate('mentorId', 'username email');
  
      if (!mentee || !mentee.mentorId) {
        return res.status(404).json({ message: 'Mentor not assigned or mentee not found' });
      }
  
      res.status(200).json(mentee.mentorId);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching assigned mentor', error: error.message });
    }
};
