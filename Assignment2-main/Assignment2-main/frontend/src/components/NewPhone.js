import { useState } from 'react';

function NewPhone(props) {
    const { contact, phones, setPhones } = props;
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number,
                name
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setNumber('');
        setName('');
    }

    return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            <select 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                required
            >
                <option value="" disabled>Select Category</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Work">Work</option>
                <option value="Others">Others</option>
            </select>
            <input 
                type='text' 
                placeholder='Phone Number' 
                onChange={(e) => setNumber(e.target.value)} 
                value={number} 
                required
            />
            <button className='button green' type='submit'>Add Phone</button>
        </form>
    );
}

export default NewPhone;
