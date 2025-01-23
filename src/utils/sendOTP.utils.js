import twilio from "twilio";

const accountSid = process.env.TWILLIO_ACCOUNT_SID; // Replace with your Twilio Account SID
const authToken = process.env.TWILLIO_ACCOUNT_AUTH_TOKEN; // Replace with your Twilio Auth Token
const twilioPhoneNumber = process.env.TWILLIO_PHONE_NUMBER; // Replace with your Twilio phone number

const client = twilio(accountSid, authToken);

/**
 * Send OTP to a mobile number
 * @param {string} phoneNumber - The recipient's phone number (e.g., +1234567890)
 * @param {string} otp - The OTP to send
 * @returns {Promise<Object>} - Result of the operation
 */
export const sendOtp = async (phoneNumber, otp) => {
  if (!phoneNumber || !otp) {
    throw new Error("Phone number and OTP are required.");
  }

  try {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    return {
      success: true,
      message: "OTP sent successfully",
      sid: message.sid, // Twilio message SID for reference
    };
  } catch (error) {
    console.error("Error sending OTP:", error);

    return {
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    };
  }
};
