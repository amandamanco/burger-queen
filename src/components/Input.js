import React from 'react';
import styled from 'styled-components';

const Inputs = styled.input`
  border-radius: 8px;
  margin-bottom: ${props => props.margin || "15px"};
  padding: 15px;
  background-color: #F6F6F6;
  border: 1px solid #E8E8E8;
`;

const Input = (props) => {
  if (props.type === 'radio') {
    return (
      <label>
        <input
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          checked={props.checked}
          margin="0"
        />
        {props.value}
      </label>
    );
  } else {
    return (
      <Inputs
        margin={props.margin}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        autoComplete={props.autoComplete}
        name={props.name}
      >
      </Inputs>
    );
  };
};

export default Input;