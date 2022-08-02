import React from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmitForm = ({ name, number }) => {
    const contact = { name, number, id: nanoid() };
    this.setState(({ contacts }) => {
      return contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
        ? alert(`${name} is already in contacts!`)
        : { contacts: [contact, ...contacts] };
    });
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onFiltr = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount = () => {
     const contacts = JSON.parse(localStorage.getItem('Contacts'))
     this.setState({contacts:contacts})
  }
  componentDidUpdate  (prevProps, prevState ){
    if (prevState.contacts !== this.state.contacts) {
       localStorage.setItem('Contacts', JSON.stringify(this.state.contacts))
     }
   }
  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmitForm} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          contacts={this.onFiltr()}
          onDeleteContact={this.onDeleteContact}
          id={this.state.contacts.id}
        />
      </div>
    );
  }
}

export default App;
