import Query from '../helpers/Query';
import { getSymbol } from '../helpers';

const partySymbolExists = async (req, res, next) => {
  res.locals.symbol = getSymbol(res.locals.partyName);
  const { rows } = await Query.checkDuplicate('parties', 'symbol', [res.locals.symbol]);
  if (rows[0]) {
    return res.status(409).send({
      status: 409,
      error: `Party acronym of ${
        rows[0].symbol
      } already exist. Please choose another name with different accronym`,
    });
  }
  return next();
};

export default partySymbolExists;
