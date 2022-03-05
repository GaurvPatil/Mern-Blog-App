

// its take state means searching value and array 
export const handleSearch = (state , array ) => {
    if (state) {
      const filtered = array.filter(
        (item) =>
          item.name.toLowerCase().includes(state) ||
          item.symbol.toLowerCase().includes(state)
      );
      return filtered;
    } else {
      return array;
    }
  };


  export const handleSearchAlldata = (state , array ) => {
    if (state) {
      const filtered = array.filter(
        (post) =>
        post.header.toLowerCase().includes(state) 
      );
      return filtered;
    } else {
      return array;
    }
  };
