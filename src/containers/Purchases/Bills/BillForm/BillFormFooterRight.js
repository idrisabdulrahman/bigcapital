import React from 'react';
import styled from 'styled-components';

import {
  T,
  TotalLines,
  TotalLine,
  TotalLineBorderStyle,
  TotalLineTextStyle,
} from 'components';

export function BillFormFooterRight() {
  return (
    <BillTotalLines labelColWidth={'180px'} amountColWidth={'180px'}>
      <TotalLine
        title={<T id={'bill.details.subtotal'} />}
        value={'$5000.00'}
        borderStyle={TotalLineBorderStyle.None}
      />
      <TotalLine
        title={<T id={'bill.details.total'} />}
        value={'$5000.00'}
        borderStyle={TotalLineBorderStyle.SingleDark}
        textStyle={TotalLineTextStyle.Bold}
      />
      <TotalLine
        title={<T id={'bill.details.payment_amount'} />}
        value={'$0.00'}
        borderStyle={TotalLineBorderStyle.None}
      />
      <TotalLine
        title={<T id={'bill.details.due_amount'} />}
        value={'$5000.00'}
        textStyle={TotalLineTextStyle.Bold}
      />
    </BillTotalLines>
  );
}

const BillTotalLines = styled(TotalLines)`
  width: 100%;
  color: #555555;
`;
