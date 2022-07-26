export const getTotalInUsd = (data) => {
  let totalInUsd = 0;

  for (const element of data) {
    if (element.currency == 'usd') {
      totalInUsd = totalInUsd + element.amount;
    }
  }

  return totalInUsd;
};

export const getTotalInArs = (data, dolarCCL) => {
  let totalInArsCCL = 0;
  // for (const element of data) {
  //   if (element.currency == 'ars') {
  //     totalInArsCCL = totalInArsCCL + element.amount
  //   }
  // }

  return totalInArsCCL + getTotalInUsd() * dolarCCL;
};
