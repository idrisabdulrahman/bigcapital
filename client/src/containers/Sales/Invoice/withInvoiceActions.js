import { connect } from 'react-redux';
import {
  submitInvoice,
  editInvoice,
  deleteInvoice,
  fetchInvoice,
  fetchInvoicesTable,
  fetchDueInvoices,
} from 'store/Invoice/invoices.actions';
import t from 'store/types';

const mapDipatchToProps = (dispatch) => ({
  requestSubmitInvoice: (form) => dispatch(submitInvoice({ form })),
  requsetFetchInvoice: (id) => dispatch(fetchInvoice({ id })),
  requestEditInvoice: (id, form) => dispatch(editInvoice(id, form)),
  requestFetchInvoiceTable: (query = {}) =>
    dispatch(fetchInvoicesTable({ query: { ...query } })),
  requestDeleteInvoice: (id) => dispatch(deleteInvoice({ id })),
  requestFetchDueInvoices: (customerId) => dispatch(fetchDueInvoices({ customerId })),
  changeInvoiceView: (id) =>
    dispatch({
      type: t.INVOICES_SET_CURRENT_VIEW,
      currentViewId: parseInt(id, 10),
    }),
  addInvoiceTableQueries: (_queries) =>
    dispatch({
      type: t.INVOICES_TABLE_QUERIES_ADD,
      _queries,
    }),

    setInvoiceNumberChanged: (isChanged) => dispatch({
      type: t.INVOICE_NUMBER_CHANGED,
      payload: { isChanged },
    }),
});

export default connect(null, mapDipatchToProps);
