import React, { FC } from 'react';
import WalletHistoryItem from './WalletHistoryItem';

interface Props {
  trxs: any[],
  loading: boolean,
  innerRef:any,
  selectTrx:(trx:any)=>void
}

const WalletHistoryRows:FC<Props> = ({
  trxs, loading, innerRef, selectTrx,
}) => (
  <>
    {
      trxs.length > 0
        ? (
          <div className="border-bottom mb-3">
            {trxs.map((trx:any, idx:number) => {
              if (trxs.length === idx + 1) {
                return (
                  <WalletHistoryItem
                    key={trx.id}
                    trx={trx}
                    innerRef={innerRef}
                    setTrx={selectTrx}
                  />
                );
              }
              return (
                <WalletHistoryItem
                  key={trx.id}
                  innerRef={null}
                  trx={trx}
                  setTrx={selectTrx}
                />
              );
            })}
          </div>
        )
        : (
          <div className="p-4 fs-5 text-center">
            <small className="text-secondary">No Transactions Yet!</small>
          </div>
        )
      }

    {loading
      && (
      <div className="text-center text-secondary pb-2">
        <small>Memuat...</small>
      </div>
      )}
  </>
);

export default WalletHistoryRows;
