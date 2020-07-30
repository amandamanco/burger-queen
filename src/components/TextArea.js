import React from 'react';
import styled from 'styled-components';

const Identificacion = styled.textarea`
  /* heigth: ${props => props.width} */
  width: ${props => props.width};
	/* margin-bottom: 10px; */
  border: 2px solid gray;
  border-radius:10px;
  font-size: 18px;
`;

function IdentificationTable(props) {
  return (
    <Identificacion 
    width={props.width}
    placeholder={props.placeholder}/>
  );
};

export default IdentificationTable;