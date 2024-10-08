import { css } from "@emotion/react";
import mq from "./mq";

//Max Witdhs para contenedores no fluids
const gap = "1.5rem";
const mwSM = "540px";
const mwMD = "720px";
const mwLG = "960px";
const mwXL = "1140px";

export { gap, mwSM, mwMD, mwLG, mwXL };

interface Props {
  fluid?: boolean;
  thin?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  space?: boolean;
  spaceTop?: boolean;
  spaceBottom?: boolean;
  maxWidth?: string;
}

const container = ({
  fluid,
  thin,
  small,
  medium = true,
  large,
  space,
  spaceTop,
  spaceBottom,
  maxWidth,
}: Props) => css`
  width: 100%;
  max-width: ${maxWidth ?? `100%`};
  padding-left: ${gap};
  padding-right: ${gap};
  position: relative;
  margin: 0 auto;
  //Tipo de contenedor
  ${!fluid
    ? css`
        @include mq(sm) {
          max-width: ${mwSM};
        }
        @include mq(md) {
          max-width: ${mwMD};
        }
        @include mq(lg) {
          max-width: ${mwLG};
        }
        @include mq(xl) {
          max-width: ${mwXL};
        }
      `
    : css``}
  //Configuracion de espacios para dividir secciones
    ${thin
    ? css`
        ${space || spaceBottom
          ? css`
              margin-bottom: 3.2rem;
              @include mq(md) {
                margin-bottom: 6.4rem;
              }
            `
          : css``}
        ${space || spaceTop
          ? css`
              margin-top: 3.2rem;
              @include mq(md) {
                margin-top: 6.4rem;
              }
            `
          : css``}
      `
    : small
    ? css`
        ${space || spaceBottom
          ? css`
              margin-bottom: 5.5rem;
              @include mq(md) {
                margin-bottom: 9.6rem;
              }
            `
          : css``}
        ${space || spaceTop
          ? css`
              margin-top: 5.5rem;
              @include mq(md) {
                margin-top: 9.6rem;
              }
            `
          : css``}
      `
    : medium && !large
    ? css`
        ${space || spaceBottom
          ? css`
              margin-bottom: 6.4rem;
              @include mq(md) {
                margin-bottom: 12.8rem;
              }
            `
          : css``}
        ${space || spaceTop
          ? css`
              margin-top: 6.4rem;
              @include mq(md) {
                margin-top: 12.8rem;
              }
            `
          : css``}
      `
    : large
    ? css`
        ${space || spaceBottom
          ? css`
              margin-bottom: 8rem;
              @include mq(md) {
                margin-bottom: 16rem;
              }
            `
          : css``}
        ${space || spaceTop
          ? css`
              margin-top: 8rem;
              @include mq(md) {
                margin-top: 16rem;
              }
            `
          : css``}
      `
    : css``}
`;

export default container;
