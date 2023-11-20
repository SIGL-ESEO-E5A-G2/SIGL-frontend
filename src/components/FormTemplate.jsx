import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormTemplate = ({ title, children, buttonText }) => {
  return (
    <div className="m-5">
      <h2>{title}</h2>
      <Form > 
        {children}
      </Form>
    </div>
  );
};

export default FormTemplate;
