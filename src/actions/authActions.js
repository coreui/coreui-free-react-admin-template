/* eslint-disable prettier/prettier */
import React from 'react'
import axios from 'axios'

const checkAuthentication = async () => {
    try {
        const response = await axios.get('http://localhost:8081/auth/check-auth');
        console.log(response.data);
    } catch (error) {
        console.error('Error checking authentication status:', error);
        console.log({ error: true, message: 'An error occurred' });
    }
};

export const login = (user) => ({
    type: 'LOGIN',
    payload: user,
})

export const logout = () => ({
    type: 'LOGOUT',
})

export const isLogged = () => {
    checkAuthentication();

}