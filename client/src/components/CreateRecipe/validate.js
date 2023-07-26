const validate = (input) => {
  // objeto con los patrones de expresión regular y los mensajes de error correspondientes

  //filtrados = filter((ele)=>(input.name === ele.name))
  // const filtrado = recipes.filter((ele) => recipes.name === input.name)

  const patterns = {
    name: {
      pattern: /^[a-zA-Z ]{1,30}$/,
      errorMessage: "El nombre de tu receta solo debe tener letras",
    },
    healthScore: {
      pattern: /^([1-9][0-9]|100)$/,
      errorMessage: "El puntaje de salud debe estar entre un rango de 10 y 100",
    },
    cookingTime: {
      pattern: /^([1-9][0-9]|720)$/,
      errorMessage:
        "El tiempo de cocción debe estar entre un rango de 10 a 720 minutos",
    },
    image: {
      pattern:
        /(http|https|ftp|ftps):\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}(\/\S*)?.*(png|jpg|jpeg|gif)$/,
      errorMessage:
        "Debe proporcionar una URL segura (https) y en formato jpg, jpeg, png o gif",
    },
    steps: {
      pattern: /^[a-zA-Z0-9 ]{25,500}$/,
      errorMessage:
        "Solo números del 1 al 10, y debe tener de 25 a 500 caracteres",
    },
    summary: {
      pattern: /^[a-zA-Z0-9 ]{25,500}$/,
      errorMessage:
        "Solo números del 1 al 10, y debe tener de 25 a 500 caracteres",
    },
    diets: {
      pattern: /^.+$/,
      errorMessage: "¡Ups! Debes añadir al menos una dieta",
    },
  };

  // objeto vacío para almacenar los errores de validación
  let errorInput = {};

  // Itera sobre el objeto patterns
  for (const error in patterns) {
    // Verifica si el campo cumple con el patrón de expresión regular
    if (!patterns[error].pattern.test(input[error])) {
      errorInput[error] = patterns[error].errorMessage;
    }
  }

  return errorInput;
};

export default validate;
