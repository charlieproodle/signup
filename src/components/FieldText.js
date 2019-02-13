import React from 'react';

export const FieldText = ({ meta, label, input }) => {
  return (
    <div className="mv4 w-100">
      <div className="b sans-serif pv2 w-100">
        <label>
          {label}
        </label>
        {meta.error && meta.touched &&
          <span className="pa2 red">({meta.error})</span>
        }
      </div>
      <div>
        <input {...input} placeholder={label} type="text" className="pa2 ba b--black-40 w-100"/>
      </div>
    </div>
  );
}

export default FieldText;
