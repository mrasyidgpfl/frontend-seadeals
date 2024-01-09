class Transactions {
  static FindTransactionByID(ax: any, id: any) {
    return ax.get(`/transactions/${id}`);
  }
}

export default Transactions;
