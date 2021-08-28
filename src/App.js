import { useState, useEffect } from 'react';
// Components //
import { ContactForm }  from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid'; 


export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => window.localStorage.setItem('contacts', JSON.stringify(contacts)),[contacts])

  const addContact = ( newName, number) => {
    const duplicateName = contacts.some( ({ name }) => newName === name)

    const contact = {
      id: uuidv4(),
      name: newName, 
      number,
    };

    duplicateName 
      ? alert(`${newName} is already in contacts`)
      : setContacts( prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = (contactId) => {
    setContacts( prevState => prevState.filter( ({ id }) => id !== contactId) )
  };

  const handleChange = (e) => {
    const {value} = e.currentTarget;  
    setFilter(value);
  };

  const getVisibleContacts = () => {
    const normalizedFilterName = filter.toLowerCase().trim();
    return contacts.filter( ({ name }) => name.toLowerCase().includes(normalizedFilterName));
  };

    return (      
      <div className="App">
        <h1 className="Phonebook-title">Phonebook</h1>
        <ContactForm addContact={ addContact } />
        <h2>Contacts</h2>
        <Filter onChange={ handleChange } filter={ filter } />
        <ContactList onDelete={ deleteContact } filteredContacts={ getVisibleContacts } />
      </div>
    )
};

App.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape()),
  filter: PropTypes.string,
};