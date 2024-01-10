import React from 'react';

const FormTemplate = ({ title, children, buttonText }) => {
  return (
    <div className="m-5">
      <h2>{title}</h2>
      <form>
        {children}
      </form>
    </div>
  );
};

export default FormTemplate;
