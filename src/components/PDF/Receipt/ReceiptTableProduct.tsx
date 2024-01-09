import React from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';
import ReceiptHeaderProductTable from './ReceiptHeaderProductTable';
import { OrderItem } from '../../../constants/orderItem';
import ReceiptItemProductTable from './ReceiptItemProductTable';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '24px 0',
  },
});

const ReceiptTableProduct = ({ orderItems }:{ orderItems:Array<OrderItem> }) => (
  <View style={styles.tableContainer}>
    <ReceiptHeaderProductTable />
    <ReceiptItemProductTable orderItems={orderItems} />
  </View>
);

export default ReceiptTableProduct;
