import styled, { keyframes } from "styled-components";
import { forwardRef } from "react";

const dualRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const DualRing = styled.div`
  display: inline-block;
  height: 80px;
  margin: auto;
  position: relative;
  width: 80px;

  &:after {
    animation: ${dualRing} 1.2s linear infinite;
    border: 6px solid white;
    border-color: white transparent white transparent;
    border-radius: 50%;
    content: " ";
    display: block;
    height: 64px;
    margin: 8px;
    width: 64px;
  }

  ${(props) => {
    if (props.primary) {
      return `
        &:after {
          border: 6px solid white;
          border-color: white transparent
            white transparent;
        }
      `;
    }
  }}
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  ${(props) => {
    if (props.fullScreen) {
      return `
        left: 0;
        position: absolute;
        top: 0;
        z-index: 5;`;
    }
  }}
`;

const Spinner = forwardRef((props, ref) => {
  return (
    <Wrapper ref={ref} {...props}>
      <DualRing {...props}></DualRing>
    </Wrapper>
  );
});

export default Spinner;
