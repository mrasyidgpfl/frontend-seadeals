export interface OrderItem {
  name: string
  weight: number
  quantity: number
  price_per_item: number
  discount: number
  subtotal: number
  variant: string
}

export interface OrderPayment {
  seller_name: string
  total_order: number
}

export interface Receipt {
  seller_name:string
  payment_method: string
  buyer: {
    name:string
    bought_date: string
    address:string
  }
  order_detail:{
    total_quantity:number
    total_order:number
    delivery_price:number
    total:number
    shop_voucher: {
      type: string
      name: string
      amount: number
      total_reduce: number
    }
    global_voucher_for_order: {
      type: string
      name: string
      amount: number
      total_reduce: number
    }
    order_items: Array<OrderItem>
  }
  transaction: {
    total_transaction: number
    global_discount: [
      {
        seller_name:string
        name:string
        type:string
        amount:number
        total_reduced:number
      },
    ]
    order_payments: Array<OrderPayment>
    total: number
  }
  courier: {
    name:string
    service:string
  }
}
