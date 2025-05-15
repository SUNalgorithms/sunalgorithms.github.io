const API_URL = import.meta.env.VITE_API_URL || 'https://sunalgorithms-backend.onrender.com';

export const sendEmail = async (formData, type, category = '') => {
  try {
    const subject = type === 'hiring'
      ? 'New Hiring Application'
      : `New DWU Query - ${category}`;

    const emailData = {
      to: 'ndouoricious@gmail.com',
      subject: subject,
      formData: formData
    };

    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) throw new Error('Failed to send email');
    return true;
  } catch (error) {
    console.error('sendEmail error:', error);
    return false;
  }
};