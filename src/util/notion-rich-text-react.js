export function renderRichText (arr) {
  const newArr = arr.map((text) => {
    const currentText = text.text.content.replace(/\n/g, "<br />");
    const annotations = text.annotations;

    if(annotations.bold) {
      return `<b>${currentText}</b>`
    } else if(annotations.italic) {
      return `<i>${currentText}</i>`
    } else if(annotations.strikethrough) {
      return `<del>${currentText}</del>`
    } else if(annotations.underline){
      return `<u>${currentText}</u>`
    } else {
      return currentText
    }
  })
  return newArr.join('');
}