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
    fontStyle: 'bold',
    flexGrow: 1,
    fontSize: '12px',
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

const ReceiptHeaderProductTable = () => (
  <View style={styles.container}>
    <Text style={styles.product_info}>Info Produk</Text>
    <Text style={styles.qty}>Jumlah</Text>
    <Text style={styles.price_per_item}>Harga Satuan</Text>
    <Text style={styles.discount}>Diskon</Text>
    <Text style={styles.total}>Total Harga</Text>
  </View>
);

export default ReceiptHeaderProductTable;
