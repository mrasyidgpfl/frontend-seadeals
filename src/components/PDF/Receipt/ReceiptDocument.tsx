import React from 'react';
import {
  Document, Page, StyleSheet, View, Text, Image,
} from '@react-pdf/renderer';
import Logo from '../../../assets/png/logo_sea_deals.png';
import { Receipt } from '../../../constants/orderItem';
import ReceiptTableProduct from './ReceiptTableProduct';
import ReceiptTableSeller from './ReceiptTableSeller';
import priceFormat from '../../../utils/priceFormatter';
import dateFormatter from '../../../utils/dateFormatter';

const styles = StyleSheet.create(
  {
    page: {
      flexDirection: 'column',
      backgroundColor: 'white',
      fontSize: '12px',
    },
    container: {
      width: '90%',
      margin: '0 auto',
    },

    content: {
      marginTop: '24px',
    },
    content_row: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    content_column: {
      flexDirection: 'column',
    },
    content_table: {
      flexDirection: 'column',
      display: 'flex',
    },

    image: {
      maxWidth: '150px',
    },
    subtitle: {
      fontWeight: 'bold',
    },
  },
);

const ReceiptDocument = ({ data }:{ data:Receipt }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <View style={styles.container}>

        <View style={styles.content}>
          <View style={styles.content_row}>
            <Image style={styles.image} src={Logo} />
            <View>
              <Text>Invoice</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.content_row}>
            <View style={[styles.content_column, { width: '45%' }]}>
              <Text style={styles.subtitle}>Diterbitkan Atas Nama</Text>
              <Text> </Text>

              <Text>
                Penjual :
                {' '}
                {data?.seller_name}
              </Text>
            </View>
            <View style={[styles.content_column, { width: '45%' }]}>
              <Text style={styles.subtitle}>Untuk</Text>
              <Text> </Text>

              <View style={[styles.content_row, { marginTop: '12px' }]}>
                <Text style={{ width: '125px' }}>
                  Pembeli
                </Text>
                <Text style={{ width: '25px' }} />
                <Text style={{ width: '125px' }}>
                  {data?.buyer?.name}
                </Text>
              </View>

              <View style={[styles.content_row, { marginTop: '12px' }]}>
                <Text style={{ width: '125px' }}>
                  Tanggal Pembelian
                </Text>
                <Text style={{ width: '25px' }} />
                <Text style={{ width: '125px' }}>
                  {dateFormatter(data?.buyer?.bought_date)}
                </Text>
              </View>

              <View style={[styles.content_row, { marginTop: '12px' }]}>
                <Text style={{ width: '125px' }}>
                  Alamat Pengiriman
                </Text>
                <Text style={{ width: '25px' }} />
                <Text style={{ width: '125px' }}>
                  {data?.buyer?.address}
                </Text>
              </View>

            </View>
          </View>
        </View>

        <View style={styles.content}>
          <ReceiptTableProduct orderItems={data?.order_detail?.order_items} />
        </View>

        <View style={styles.content}>
          <View style={styles.content_row}>
            <View style={styles.content_column} />
            <View style={styles.content_column}>
              <View style={styles.content_row}>
                <Text>Total Harga</Text>
                <Text>{priceFormat(data?.order_detail?.total_order)}</Text>
              </View>
              {data?.order_detail.shop_voucher != null
                  && data?.order_detail.shop_voucher.amount && (
                  <View style={styles.content_row}>
                    <Text style={{ color: 'gray' }}>
                      Diskon
                      {' '}
                      {data.order_detail.shop_voucher.name}
                    </Text>
                    <Text style={{ color: 'gray', marginRight: '25px' }} />
                    <Text style={{ color: 'gray' }}>{`-${priceFormat(data?.order_detail?.shop_voucher.total_reduce)}`}</Text>
                  </View>
              )}
              {data?.order_detail.global_voucher_for_order != null
                  && data?.order_detail.global_voucher_for_order.amount && (
                  <View style={styles.content_row}>
                    <Text style={{ color: 'gray' }}>
                      Diskon
                      {' '}
                      {data.order_detail.global_voucher_for_order.name}
                    </Text>
                    <Text style={{ color: 'gray', marginRight: '25px' }} />
                    <Text style={{ color: 'gray' }}>{`-${priceFormat(data?.order_detail?.global_voucher_for_order.total_reduce)}`}</Text>
                  </View>
              )}
              <View style={styles.content_row}>
                <Text>Biaya Kirim</Text>
                <Text style={{ marginRight: '25px' }} />
                <Text>{priceFormat(data?.order_detail?.delivery_price)}</Text>
              </View>
              <View style={styles.content_row}>
                <Text>Total Tagihan</Text>
                <Text style={{ marginRight: '25px' }} />
                <Text>{priceFormat(data?.order_detail?.total)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <ReceiptTableSeller orderPayments={data?.transaction?.order_payments} />
        </View>

        <View style={styles.content}>
          <View style={styles.content_row}>
            <View style={styles.content_column} />
            <View style={styles.content_column}>
              <View style={styles.content_row}>
                <Text>Total Belanja</Text>
                <Text style={{ marginRight: '25px' }} />
                <Text>{priceFormat(data?.transaction?.total_transaction)}</Text>
              </View>
              {data.transaction.global_discount != null
                  && data.transaction.global_discount.length
                  && data.transaction.global_discount.map((value) => (
                    <View style={styles.content_row}>
                      <Text style={{ color: 'gray' }}>{`Discount ${value.name}`}</Text>
                      <Text style={{ color: 'gray', marginRight: '25px' }} />
                      <Text style={{ color: 'gray' }}>{`-${priceFormat(value.total_reduced)}`}</Text>
                    </View>
                  ))}
              <View style={styles.content_row}>
                <Text>Total Tagihan</Text>
                <Text style={{ marginRight: '25px' }} />
                <Text>{priceFormat(data?.transaction?.total)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: '24px', width: '100%' }}>
          <Text> </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.content_row}>
            <View style={styles.content_column}>
              <Text>Kurir</Text>
              <Text>{`${data?.courier?.name} - ${data?.courier?.service}`}</Text>
            </View>
            <View style={styles.content_column}>
              <Text>Metode Pembayaran</Text>
              <Text>{data?.payment_method}</Text>
            </View>
          </View>
        </View>

      </View>
    </Page>
  </Document>
);

export default ReceiptDocument;
