// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import moment from 'moment';
import {
  Button,
  Popover,
  PopoverInteractionKind,
  Position,
  MenuItem,
  Menu,
} from '@blueprintjs/core';
import { Icon, FormatNumberCell } from '@/components';
import { getColumnWidth } from '@/utils';
import { usePaymentReceiveDetailContext } from './PaymentReceiveDetailProvider';

/**
 * Retrieve payment entries table columns.
 */
export const usePaymentReceiveEntriesColumns = () => {
  const {
    paymentReceive: { entries },
  } = usePaymentReceiveDetailContext();

  return React.useMemo(
    () => [
      {
        Header: intl.get('date'),
        accessor: (row) => moment(row.payment_date).format('YYYY MMM DD'),
        width: 100,
        className: 'date',
        disableSortBy: true,
      },
      {
        Header: intl.get('invoice_no'),
        accessor: 'invoice.invoice_no',
        width: 150,
        className: 'invoice_number',
        disableSortBy: true,
      },
      {
        Header: intl.get('invoice_amount'),
        accessor: 'invoice.balance',
        Cell: FormatNumberCell,
        width: getColumnWidth(entries, 'invoice.balance', {
          minWidth: 60,
          magicSpacing: 5,
        }),
        align: 'right',
        textOverview: true,
      },
      {
        Header: intl.get('amount_due'),
        accessor: 'invoice.due_amount',
        Cell: FormatNumberCell,
        align: 'right',
        width: getColumnWidth(entries, 'invoice.due_amount', {
          minWidth: 60,
          magicSpacing: 5,
        }),
        disableSortBy: true,
        textOverview: true,
      },
      {
        Header: intl.get('payment_amount'),
        accessor: 'payment_amount_formatted',
        align: 'right',
        width: getColumnWidth(entries, 'payment_amount_formatted', {
          minWidth: 60,
          magicSpacing: 5,
        }),
        disableSortBy: true,
        textOverview: true,
      },
    ],
    [],
  );
};

export function PaymentReceiveMoreMenuItems({ payload: { onNotifyViaSMS } }) {
  return (
    <Popover
      minimal={true}
      content={
        <Menu>
          <MenuItem
            onClick={onNotifyViaSMS}
            text={intl.get('notify_via_sms.dialog.notify_via_sms')}
          />
        </Menu>
      }
      interactionKind={PopoverInteractionKind.CLICK}
      position={Position.BOTTOM_LEFT}
      modifiers={{
        offset: { offset: '0, 4' },
      }}
    >
      <Button icon={<Icon icon="more-vert" iconSize={16} />} minimal={true} />
    </Popover>
  );
}
