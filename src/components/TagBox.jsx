import styled from 'styled-components';

const Title = styled.span`
  background-color: palevioletred;
  margin-right: 5px;
  padding: 2px 4px;
  border-radius: 2px;
`;

export default function TagBox({ children }) {
  return <Title>{children}</Title>;
}
