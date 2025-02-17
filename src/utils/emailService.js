const API_URL = import.meta.env.VITE_API_URL || 'https://sunalgorithms-backend.onrender.com';

export const sendEmail = async (formData, type, category = '') => {
  try {
    // Create email subject based on type
    const subject = type === 'hiring' 
      ? 'New Hiring Application' 
      : `New DWU Query - ${category}`;

    const emailData = {
      to: 'ndouoricious@gmail.com',
      subject: subject,
      formData: formData
    };

    console.log('Sending email data:', emailData);

    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    const data = await response.json();
    console.log('Server response:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}; 