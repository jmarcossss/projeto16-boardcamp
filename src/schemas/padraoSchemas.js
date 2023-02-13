import joi from 'joi';

export const padraoSchemaGames = joi.object({
  name: joi.string().required(),
  image: joi.string().required(),
  stockTotal: joi.number().min(1).required(),
  pricePerDay: joi.number().min(1).required(),
});

export const padraoSchemaCustomers = joi.object({
    name: joi.string().required(),
    phone: joi.string().required(),
    cpf: joi.string().length(11).regex(/^[0-9]+$/).required(),
    birthday: joi.date().required(),
});