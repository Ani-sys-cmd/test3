import cron from 'node-cron';
import Appointment from '../models/Appointment.js';
import { sendEmail } from './emailService.js';

const sendReminders = async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const endOfTomorrow = new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000);

    const appointments = await Appointment.find({
      date: {
        $gte: tomorrow,
        $lt: endOfTomorrow
      },
      status: 'Accepted' // Changed to match your enum
    })
    .populate('sender receiver', 'email username')
    .lean();

    console.log(`Found ${appointments.length} appointments for tomorrow`);

    for (const appointment of appointments) {
      try {
        // Format the date and include the specific time
        const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
          dateStyle: 'full'
        });

        const senderSubject = `Reminder: Appointment with ${appointment.receiver.username}`;
        const senderText = `
Hello ${appointment.sender.username},

This is a reminder that you have an appointment scheduled for:
Date: ${formattedDate}
Time: ${appointment.time}
With: ${appointment.receiver.username}
Reason: ${appointment.reason}

Please make sure to be on time.

Best regards,
Your Appointment System
        `.trim();

        const receiverSubject = `Reminder: Appointment with ${appointment.sender.username}`;
        const receiverText = `
Hello ${appointment.receiver.username},

This is a reminder that you have an appointment scheduled for:
Date: ${formattedDate}
Time: ${appointment.time}
With: ${appointment.sender.username}
Reason: ${appointment.reason}

Please make sure to be on time.

Best regards,
Your Appointment System
        `.trim();

        await Promise.all([
          sendEmail(appointment.sender.email, senderSubject, senderText),
          sendEmail(appointment.receiver.email, receiverSubject, receiverText)
        ]);

        console.log(`Reminder sent successfully for appointment ${appointment._id}`);
      } catch (error) {
        console.error(`Error sending reminder for appointment ${appointment._id}:`, error);
      }
    }

    console.log('Reminder sending process completed');
  } catch (error) {
    console.error('Error in reminder scheduler:', error);
  }
};

// Schedule to run every day at 12 AM.
cron.schedule('0 0 * * *', sendReminders, { //set the time as needed
  timezone: 'UTC'
});

// // Schedule every 1 minute UTC
// cron.schedule('* * * * *', sendReminders, {
//   timezone: 'UTC'
// });

// Export for testing or manual triggering
export { sendReminders };
