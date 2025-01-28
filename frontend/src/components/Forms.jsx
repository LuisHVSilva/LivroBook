import React, { useState } from 'react';

const Forms = ({ fields, buttonTitle }) => {  
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          <br />
          <input
            id={field.id}
            type={field.type}
            value={formData[field.id] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">{buttonTitle}</button>
    </form>
  );
}

export default Forms