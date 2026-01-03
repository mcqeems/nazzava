import styled from 'styled-components';

const Dot = () => {
  return (
    <StyledWrapper>
      <div className="spinner">
        <span className="bg-foreground h-1.5 w-1.5 md:h-2 md:w-2" />
        <span className="bg-foreground h-1.5 w-1.5 md:h-2 md:w-2" />
        <span className="bg-foreground h-1.5 w-1.5 md:h-2 md:w-2" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .spinner {
    --gap: 6px;
    /* gap between each circle */
    width: full;
    height: full;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--gap);
  }

  .spinner span {
    border-radius: 100%;
    opacity: 0;
  }

  .spinner span:nth-child(1) {
    animation: fade 1s ease-in-out infinite;
  }

  .spinner span:nth-child(2) {
    animation: fade 1s ease-in-out 0.33s infinite;
  }

  .spinner span:nth-child(3) {
    animation: fade 1s ease-in-out 0.66s infinite;
  }

  @keyframes fade {
    0%,
    100% {
      opacity: 1;
    }

    60% {
      opacity: 0;
    }
  }
`;

export default Dot;
