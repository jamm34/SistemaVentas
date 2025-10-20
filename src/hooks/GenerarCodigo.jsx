export const GenerarCodigo = (data) => {
    const ultimoIdProducto = data.id + 1;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const codeLenght = 4;
    let randomCode = "";
    for (let i = 0; i < codeLenght; i++) {
        randomCode += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    const codigo = `${randomCode}${ultimoIdProducto}369`;
    return codigo;
};