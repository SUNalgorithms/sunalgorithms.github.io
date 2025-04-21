const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  async submitHiringForm(data) {
    try {
      const response = await fetch(`${API_URL}/api/hire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Add other API calls as needed
}; 