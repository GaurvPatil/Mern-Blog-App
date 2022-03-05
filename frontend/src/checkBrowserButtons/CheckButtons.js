export const relode =
  (window.performance.navigation && window.performance.navigation.type === 1) ||
  window.performance
    .getEntriesByType("navigation")
    .map((nav) => nav.type)
    .includes("reload");

// for Viewmarket page
export const checkButton = (pagelocation, currentURL) => {
  // after relode or browser back buttons check url and scroll to bottom

  const pageAccessedByReload = () => {
    if (relode) {
      if (pagelocation === currentURL) {
        return true;
      }
      return;
    }

    return;
  };

  const pageAccessedByButtons = () => {
    window.onpopstate = () => {
      if (pagelocation === currentURL) {
        return true;
      }
    };
    return;
  };

  const checkRelodeAndScroll = () => {
    if (pageAccessedByReload) {
      setTimeout(() => {
        window.scroll(0, document.documentElement.scrollHeight);
      }, 1000);
    } else if (pageAccessedByButtons) {
      window.scroll(0, document.documentElement.scrollHeight);
    }
  };
  checkRelodeAndScroll();
};

