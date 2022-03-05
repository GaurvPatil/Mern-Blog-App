

 export const colorChanger = (colorLight , colorDark, checkTheme ) => {
    if (checkTheme === "light") {
      return colorLight;
    }
    return colorDark;
  }