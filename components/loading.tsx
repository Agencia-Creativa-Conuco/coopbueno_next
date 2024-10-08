import React from "react";
import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import colors from "@/styles/colors";

const addAlpha = (hex: any, alpha: any) => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const long = keyframes`
  0% {left: -35%;right: 100%}
  60% {left: 100%;right: -90%}
  100% {left: 100%;right: -90%}
`;

const short = keyframes`
  0% {left: -200%;right: 100%}
  60% {left: 107%;right: -8%}
  100% {left: 107%;right: -8%}
`;

interface LoaderProps {
  i: number;
  color: string;
}
const Loader = styled.div`
  ${({ i = 1, color }: LoaderProps) =>
    css`
      position: absolute;
      height: 240px;
      overflow: hidden;
      background-color: ${color};
      background-clip: padding-box;
      display: block;
      border-radius: 2px;
      will-change: left, right;
      animation-fill-mode: forwards;
      animation: ${i === 1 ? long : short} 2.1s ${i === 2 ? "1.15s" : ""}
        ${i === 1
          ? css`cubic-bezier(0.65, 0.815, 0.735, 0.395)`
          : css`cubic-bezier(0.165, 0.84, 0.44, 1)`}
        infinite;
      animation-iteration-count: infinite;
    `}
`;

const Wrapper = styled.div`
  ${(props: { width: number; height: number; color: string }) =>
    css`
      position: relative;
      width: ${props.width}px;
      height: ${props.height}px;
      overflow: hidden;
      background-color: ${addAlpha(props.color, 0.2)};
      background-clip: padding-box;
    `}
`;

interface LoadingProps {
  full?: boolean;
}
const Loading = ({ full = false }: LoadingProps) => (
  <Container full={full}>
    <Wrapper width={240} height={4} color={colors.primary.base}>
      <Loader i={1} color={colors.primary.base} />
    </Wrapper>
  </Container>
);

export default Loading;

const Container = styled.div`
  ${(props: { full?: boolean }) => css`
    width: 100%;
    ${props.full
      ? css`
          height: 100vh;
          display: flex;
          align-items: center;
        `
      : css`
          height: initial;
        `}
    margin: 0;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;

    & > * {
      margin-top: 24px;
    }
  `}
`;
