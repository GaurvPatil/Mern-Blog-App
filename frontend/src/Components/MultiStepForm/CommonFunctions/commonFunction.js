// add Item in array
export const addItemInArr = (paragraph, setParagraph, setSectionData) => {
  if (paragraph) {
    setSectionData((prevSection) => {
      return {
        ...prevSection,
        paragraphs: [...prevSection.paragraphs, paragraph],
      };
    });
    setParagraph("");
  }
};

// remove last item from array

export const removeLastItemFromArr = (
  setValue,
  sectionData,
  setSectionData
) => {
  setValue();
  const newArr = (data) => {
    let arr = [...data];
    if (arr.length < 0) {
      return [];
    } else arr.pop();
    return arr;
  };

  if (sectionData.paragraphs.length >= 0) {
    setSectionData((prevSection) => {
      return {
        ...prevSection,
        paragraphs: newArr([...prevSection.paragraphs]),
      };
    });
  }
};

// update item from Array

export const updateItemInArr = (
  index,
  paragraph,
  sectionDataPara,
  setSectionData,
  setParagraph
) => {
  if (paragraph) {
    const arr = [...sectionDataPara];
    arr[index] = paragraph;
    setSectionData({
      ...setSectionData,
      paragraphs: arr,
    });
    setParagraph("");
  }
};

// delete item from array

export const deleteItemFromArr = (index, sectionDataPara, setSectionData) => {
  if (sectionDataPara.length > 0) {
    setSectionData((prevSection) => {
      return {
        ...prevSection,
        paragraphs: prevSection.paragraphs.filter((item, idx) => idx !== index),
      };
    });
  }
};
