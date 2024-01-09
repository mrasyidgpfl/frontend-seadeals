import React from 'react';
import {
  Text, View, StyleSheet,
} from '@react-pdf/renderer';
import { OrderItem } from '../../../constants/orderItem';
import priceFormat from '../../../utils/priceFormatter';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'flex-start',
    height: 24,
    fontStyle: 'bold',
    textAlign: 'left',
  },
  product_info: {
    width: '40%',
    textAlign: 'left',
    margin: 'auto 12px',
  },
  qty: {
    width: '5%',
    textAlign: 'left',
    margin: 'auto 12px',
  },
  price_per_item: {
    width: '15%',
    textAlign: 'left',
    margin: 'auto 12px',
  },
  discount: {
    width: '15%',
    textAlign: 'left',
    margin: 'auto 12px',
  },
  total: {
    width: '25%',
    textAlign: 'left',
    margin: 'auto 12px',
  },
});

const ReceiptItemProductTable = ({ orderItems }:{ orderItems:Array<OrderItem> }) => {
  const rows = orderItems?.map((item) => (
    <View style={styles.row} key={item.name.toString()}>
      <Text style={styles.product_info}>{`${item.name},${item.variant}`}</Text>
      <Text style={styles.qty}>{item.quantity}</Text>
      <Text style={styles.price_per_item}>{priceFormat(item.price_per_item)}</Text>
      <Text style={styles.discount}>{item.discount && priceFormat(item.discount)}</Text>
      <Text style={styles.total}>{priceFormat(item.subtotal)}</Text>
    </View>
  ));
  return (<div>{rows}</div>);
};

export default ReceiptItemProductTable;
