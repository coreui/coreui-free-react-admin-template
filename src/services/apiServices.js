import apiPlugin from './api';
const API_URL = "https://nestapi.treejer.com"

export const getNonce = async (address) => {
  try {
    const response = await apiPlugin.getData(`${API_URL}/nonce/${address}`);
    return response;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const login = async (address, signature) => {
  try {
    const response = await apiPlugin.postData(`${API_URL}/login/${address}`, {
      signature: signature,
    });
    return response;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};
