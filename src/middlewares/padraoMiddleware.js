import express from "express"

//Função para servir como validação para o schema
export function padraoMiddleware(schema) {
  return (require, response, func) => {
    const { error } = schema.validate(require.body, { abortEarly: false });
    //Se der erro no middleware, então retorna status 400
    if(error) {
      const errors = error.details.map((detail) => detail.message);
      return response.status(400).send({ errors });
    }

    func();
  };
}