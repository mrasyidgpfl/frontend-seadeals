import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    backgroundColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'flex-start',
    height: 24,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
  },
  seller_info: {
    width: '100%',
    textAlign: 'left',
    margin: 'auto 12px',
  },
});

const ReceiptHeaderSellerTable = () => (
  <View style={styles.container}>
    <Text style={styles.seller_info}>Detail Pembayaran</Text>
  </View>
);

export default ReceiptHeaderSellerTable;
