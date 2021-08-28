import { useState } from 'react';
import './ContactForm.scss';

export function ContactForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    switch(name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break; 

      default:
        return;
    };
  };

  const formSubmit = (e) => {
    e.preventDefault();
    addContact(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className="Phonebook-form" onSubmit={formSubmit}>         
      <label className="Phonebook__label">
        Name:<br></br><input
          className="Phonebook__input"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Ім'я може складатись тільки з букв, апострофа, тире і пробілів. Наприклад Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan і т. п."
          required
        />
      </label> 
      <label className="Phonebook__label">
        Number:<br></br><input
          className="Phonebook__input"
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Телефон повинен складатись з цифр і може містити пробіли, тире, круглі скобки і може починатися з + ."
          required
        />
      </label>
      <button className="Phonebook__button" type="submit" >Add contact</button>
    </form>
  );
};