import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { OrderPayment } from '../../../constants/orderItem';
import priceFormat from '../../../utils/priceFormatter';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'flex-start',
    height: 24,
    fontStyle: 'bold',
  },
  seller_info: {
    width: '85%',
    textAlign: 'left',
    margin: 'auto 12px',
  },
  price: {
    width: '15%',
    textAlign: 'left',
    margin: 'auto 12px',
  },
});

const ReceiptItemSellerTable = ({ orderPayments }:{ orderPayments:Array<OrderPayment> }) => {
  const rows = orderPayments?.map((item) => (
    <View style={styles.row} key={item.seller_name.toString()}>
      <Text style={styles.seller_info}>{item.seller_name}</Text>
      <Text style={styles.price}>{priceFormat(item.total_order)}</Text>
    </View>
  ));
  return (
    <div>
      { rows }
    </div>
  );
};

export default ReceiptItemSellerTable;
