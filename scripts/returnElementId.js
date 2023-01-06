const returnElementId = (input) => {
    const idKeywords = [];
    const regexConditional = /^[A-Za-z0-9 ]+$/g;
    input.split(' ').forEach((inputPart) => {
        if (inputPart.match(regexConditional)) {
            idKeywords.push(inputPart);
        }
    });
    return idKeywords.join('-');
}

export default returnElementId;