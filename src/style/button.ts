// buttonStyles.ts
import { css } from "styled-components";
import { typography } from "./typography";

export const button = {
  default: {
    default: css`
      background-color: #2f3036;
      color: #ffffff;
    `,
    outline: css`
      background-color: #ffffff;
      color: #2f3036;
      border: 1px solid #2f3036;
    `,
    text: css`
      background-color: #ffffff;
      color: #2f3036;
    `,
  },
  disabled: {
    default: css`
      background-color: #efefef;
      color: #898c9b;
    `,
    outline: css`
      background-color: #ffffff;
      color: #898c9b;
      border: 1px solid #898c9b;
    `,
    text: css`
      background-color: #ffffff;
      color: #898c9b;
    `,
  },
  error: {
    default: css`
      background-color: #ff4321;
      color: #ffffff;
    `,
    outline: css`
      background-color: #ffffff;
      color: #ff4321;
      border: 1px solid #ff4321;
    `,
    text: css`
      background-color: #ffffff;
      color: #ff4321;
    `,
  },
};

export const buttonSize = {
  small: css`
    height: 42px;
    ${typography.title_01}
  `,
  big: css`
    height: 48px;
    ${typography.title_02}
  `,
};
