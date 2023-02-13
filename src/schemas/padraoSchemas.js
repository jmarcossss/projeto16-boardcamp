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

export const padraoSchemaRentals = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    rentDate: joi.date().required(),
    daysRented: joi.number().required(),
    returnDate: joi.date(),
    originalPrice: joi.number().required(),
    delayFee: joi.number(),
  });
  
export const padraoSchemaRentals2 = joi.object({
    customerId: joi
      .number()
      .integer()
      .min(1)
      .max(Number.MAX_SAFE_INTEGER)
      .required(),
    gameId: joi.number().integer().min(1).max(Number.MAX_SAFE_INTEGER).required(),
    daysRented: joi
      .number()
      .integer()
      .min(1)
      .max(Number.MAX_SAFE_INTEGER)
      .required(),
});