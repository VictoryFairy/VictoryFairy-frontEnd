import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer className='loading'>
      <Spinner />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  content: "";
  display: block;
  height: 50px;
  width: 50px;
  animation: spin 0.5s infinite linear;
  border: 6px var(--primary-color) solid;
  border-left-color: var(--white);
  border-radius: 100%;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
