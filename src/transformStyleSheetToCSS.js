const defaultCss = {
  backgroundColor: 'white',
  borderRadius: 0,
  borderColor: 'white',
  borderWidth: 0,
  height: 200,
};

export const transformStyleSheetToCSS = styleSheet => {
  const tempCss = {...defaultCss, ...styleSheet};

  return `{
    background-color: ${convertValue(tempCss.backgroundColor)};
    border-radius: ${convertToPx(tempCss.borderRadius)};
    border-width: ${convertToPx(tempCss.borderWidth)};
    border-color: ${convertValue(tempCss.borderColor)};
    height: ${convertToPx(tempCss.height)};
    width: ${convertToPx(tempCss.width)};
  }`;
};

const convertToPx = value => {
  return value !== undefined && value !== null && value !== ''
    ? `${value}px`
    : '';
};

const convertValue = value => {
  return value ? `${value}` : '';
};
