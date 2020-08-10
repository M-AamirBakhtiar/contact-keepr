import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import ContactContext from '../../context/contact/contactContext';
import authContext from '../../context/auth/authContext';

const Home = () => {
  const { loadUser } = useContext(authContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const { contacts } = useContext(ContactContext);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        {contacts !== null && contacts.length > 0 && <ContactFilter />}
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
