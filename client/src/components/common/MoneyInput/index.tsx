import {useState} from 'react';

function MoneyInput({ amount, onAmountChange }:any) {
  const handleChange = (event:any) => {
    const newValue = event.target.value
      .replace(/\u00A0/g, '')
      .replace(',','.')
      .replace(/[^\d\.]/g, '');

    if(newValue !== '') {
      onAmountChange(parseFloat(newValue));
    }
  }
  const formattedAmount = amount.toLocaleString('es-CO',{
    style: 'currency',
    currency: 'COP',
  });

  return (
    <input
      type="text"
      value={formattedAmount}
      onChange={handleChange}
    />
  );
}

export default MoneyInput
