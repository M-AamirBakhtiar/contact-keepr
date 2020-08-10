import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
  DELETE_CONTACT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT,
} from '../types.js';

// Global State Function
const ContactState = (props) => {
  // Initial State Values
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  // Pulling out state and dispatch from useReducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/v1/contacts');

      dispatch({
        type: GET_CONTACTS,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  // Clear Contacts
  const clearContacts = () =>
    dispatch({
      type: CLEAR_CONTACTS,
    });

  // Add Contact
  const addContact = async (contact) => {
    // Config options to pass headers to axios
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/contacts', contact, config);

      dispatch({
        type: ADD_CONTACT,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/v1/contacts/${id}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  // Update Contact
  const updateContact = async (contact) => {
    // Config options to pass headers to axios
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        `/api/v1/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        clearContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
