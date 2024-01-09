const formatCardNumber = (cardNum:string) => {
  if (cardNum && cardNum.length !== 16) return cardNum;

  const split = cardNum.match(/.{1,4}/g) ?? [];
  return split.join('·');
};

export const parseTrxDesc = (trx:any) => {
  if (trx.transaction_id && trx.description.includes('Refund')) return trx.description;
  if (trx.transaction_id) return `${trx.description} for Transaction ID ${trx.transaction_id}`;
  return trx.description;
};

export default formatCardNumber;
