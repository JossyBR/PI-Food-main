const validate = (input) => {
  // objeto con los patrones de expresión regular y los mensajes de error correspondientes

  //filtrados = filter((ele)=>(input.name === ele.name))
  // const filtrado = recipes.filter((ele) => recipes.name === input.name)

  const patterns = {
    name: {
      pattern: /^[a-zA-Z ]{1,30}$/,
      errorMessage: "Your recipe's name must only have letters",
    },
    healthScore: {
      pattern: /^([1-9][0-9]|100)$/,
      errorMessage: "Health Score must be between a range of 10 and 100",
    },
    cookingTime: {
      pattern: /^([1-9][0-9]|720)$/,
      errorMessage:
        "Cooking time must be between a range of 10 and 720 minutes",
    },
    image: {
      pattern:
        /(http|https|ftp|ftps):\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}(\/\S*)?.*(png|jpg|jpeg|gif)$/,
      errorMessage:
        "You must provide a secure URL (https) and in a jpg, jpeg, png or gif format",
    },
    steps: {
      pattern: /^[a-zA-Z0-9 ]{25,500}$/,
      errorMessage:
        "Only numbers from 1 to 10, and must have from 25 to 500 characters",
    },
    summary: {
      pattern: /^[a-zA-Z0-9 ]{25,500}$/,
      errorMessage:
        "Only numbers from 1 to 10, and must have from 25 to 500 characters",
    },
    diets: {
      pattern: /^.+$/,
      errorMessage: "Oops! You must add at least one diet",
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
