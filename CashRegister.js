var cashInDrawer = [
  { name: "ONE HUNDRED", val: 100 },
  { name: "TWENTY", val: 20 },
  { name: "TEN", val: 10 },
  { name: "FIVE", val: 5 },
  { name: "ONE", val: 1 },
  { name: "QUARTER", val: 0.25 },
  { name: "DIME", val: 0.1 },
  { name: "NICKEL", val: 0.05 },
  { name: "PENNY", val: 0.01 },
];

function checkCashRegister(price, cash, cid) {
  var output = { status: null, change: [] };
  var change = cash - price;
  var register = cid.reduce(
    (account, currency) => {
      account.total += currency[1];
      account[currency[0]] = currency[1];
      return account;
    },
    { total: 0 }
  );
  if (register.total === change) {
    output.status = "CLOSED";
    output.change = cid;
    return output;
  }
  if (register.total < change) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  }
  var change_arr = cashInDrawer.reduce((account, currency) => {
    var value = 0;
    while (register[currency.name] > 0 && change >= currency.val) {
      change -= currency.val;
      register[currency.name] -= currency.val;
      value += currency.val;
      change = Math.round(change * 100) / 100;
    }
    if (value > 0) {
      account.push([currency.name, value]);
    }
    return account;
  }, []);
  if (change > 0 || change_arr.length < 1) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  }
  output.status = "OPEN";
  output.change = change_arr;
  return output;
}
