import React from 'react';
import styled from 'react-emotion';

const Button = styled('div')`
  align-items: center;
  background-color: ${({ theme }) => theme.accent};
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  height: 2rem;
  justify-content: center;
  width: 2rem;
`;

export default ({ onClick }) => <Button type="button" onClick={onClick}>+</Button>;
