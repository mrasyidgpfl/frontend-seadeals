import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import ReceiptDocument from '../../../components/PDF/Receipt/ReceiptDocument';
import { Receipt } from '../../../constants/orderItem';
import Button from '../../../components/Button/Button';
import StyleSheet = ReactPDF.StyleSheet;

const style = StyleSheet.create({
  button: {
    display: 'flex',
    marginTop: '24px',
    marginBottom: '12px',
    justifyContent: 'flex-end',
    paddingRight: '12px',
  },
});

const UserOrderReceiptDownload = ({ data }:{ data:Receipt }) => (
  <PDFDownloadLink style={style.button} document={<ReceiptDocument data={data} />} fileName="invoice.pdf">
    {({ loading }) => ((loading) ? (
      <Button text="Lihat Tagihan" buttonType="secondary disabled" handleClickedButton={() => {}} />
    ) : (
      <Button text="Lihat Tagihan" buttonType="primary" handleClickedButton={() => {}} />
    ))}
  </PDFDownloadLink>
);

export default UserOrderReceiptDownload;
