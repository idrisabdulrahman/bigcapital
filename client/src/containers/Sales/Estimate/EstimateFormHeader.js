import React, { useMemo, useCallback, useState } from 'react';
import {
  FormGroup,
  InputGroup,
  Intent,
  Position,
  MenuItem,
  Classes,
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { FormattedMessage as T } from 'react-intl';
import moment from 'moment';
import { momentFormatter, compose, tansformDateValue, saveInvoke } from 'utils';
import classNames from 'classnames';
import { CLASSES } from 'common/classes';
import {
  ContactSelecetList,
  ErrorMessage,
  FieldRequiredHint,
  Icon,
  InputPrependButton,
  Row,
  Col,
} from 'components';

import withCustomers from 'containers/Customers/withCustomers';
import withDialogActions from 'containers/Dialog/withDialogActions';

function EstimateFormHeader({
  formik: { errors, touched, setFieldValue, getFieldProps, values },

  //#withCustomers
  customers,
  // #withDialogActions
  openDialog,
  // #ownProps
  onEstimateNumberChanged,
}) {
  const handleDateChange = useCallback(
    (date_filed) => (date) => {
      const formatted = moment(date).format('YYYY-MM-DD');
      setFieldValue(date_filed, formatted);
    },
    [setFieldValue],
  );

  const CustomerRenderer = useCallback(
    (cutomer, { handleClick }) => (
      <MenuItem
        key={cutomer.id}
        text={cutomer.display_name}
        onClick={handleClick}
      />
    ),
    [],
  );

  // handle change customer
  const onChangeCustomer = useCallback(
    (filedName) => {
      return (customer) => {
        setFieldValue(filedName, customer.id);
      };
    },
    [setFieldValue],
  );

  const handleEstimateNumberChange = useCallback(() => {
    openDialog('estimate-number-form', {});
  }, [openDialog]);

  const handleEstimateNumberChanged = (event) => {
    saveInvoke(onEstimateNumberChanged, event.currentTarget.value);
  };

  return (
    <div className={classNames(CLASSES.PAGE_FORM_HEADER)}>
      <div className={'page-form__primary-section'}>
        {/* ----------- Customer name ----------- */}
        <FormGroup
          label={<T id={'customer_name'} />}
          inline={true}
          className={classNames(
            'form-group--select-list',
            'form-group--customer',
            Classes.FILL,
          )}
          labelInfo={<FieldRequiredHint />}
          intent={errors.customer_id && touched.customer_id && Intent.DANGER}
          helperText={
            <ErrorMessage name={'customer_id'} {...{ errors, touched }} />
          }
        >
          <ContactSelecetList
            contactsList={customers}
            selectedContactId={values.customer_id}
            defaultSelectText={<T id={'select_customer_account'} />}
            onContactSelected={onChangeCustomer('customer_id')}
          />
        </FormGroup>

        <Row>
          <Col md={8} className={'col--estimate-date'}>
            {/* ----------- Estimate date ----------- */}
            <FormGroup
              label={<T id={'estimate_date'} />}
              inline={true}
              labelInfo={<FieldRequiredHint />}
              className={classNames(
                'form-group--select-list',
                'form-group--estimate-date',
                Classes.FILL,
              )}
              intent={
                errors.estimate_date && touched.estimate_date && Intent.DANGER
              }
              helperText={
                <ErrorMessage name="estimate_date" {...{ errors, touched }} />
              }
            >
              <DateInput
                {...momentFormatter('YYYY/MM/DD')}
                value={tansformDateValue(values.estimate_date)}
                onChange={handleDateChange('estimate_date')}
                popoverProps={{ position: Position.BOTTOM, minimal: true }}
              />
            </FormGroup>
          </Col>
          <Col md={4} className={'col--expiration-date'}>
            {/* ----------- Expiration date ----------- */}
            <FormGroup
              label={<T id={'expiration_date'} />}
              inline={true}
              className={classNames(
                'form-group--select-list',
                'form-group--expiration-date',
                Classes.FILL,
              )}
              intent={
                errors.expiration_date &&
                touched.expiration_date &&
                Intent.DANGER
              }
              helperText={
                <ErrorMessage name="expiration_date" {...{ errors, touched }} />
              }
            >
              <DateInput
                {...momentFormatter('YYYY/MM/DD')}
                value={tansformDateValue(values.expiration_date)}
                onChange={handleDateChange('expiration_date')}
                popoverProps={{ position: Position.BOTTOM, minimal: true }}
              />
            </FormGroup>
          </Col>
        </Row>

        {/* ----------- Estimate number ----------- */}
        <FormGroup
          label={<T id={'estimate'} />}
          inline={true}
          className={('form-group--estimate-number', Classes.FILL)}
          labelInfo={<FieldRequiredHint />}
          intent={
            errors.estimate_number && touched.estimate_number && Intent.DANGER
          }
          helperText={
            <ErrorMessage name="estimate_number" {...{ errors, touched }} />
          }
        >
          <InputGroup
            intent={
              errors.estimate_number && touched.estimate_number && Intent.DANGER
            }
            minimal={true}
            rightElement={
              <InputPrependButton
                buttonProps={{
                  onClick: handleEstimateNumberChange,
                  icon: <Icon icon={'settings-18'} />,
                }}
                tooltip={true}
                tooltipProps={{
                  content: 'Setting your auto-generated estimate number',
                  position: Position.BOTTOM_LEFT,
                }}
              />
            }
            {...getFieldProps('estimate_number')}
            onBlur={handleEstimateNumberChanged}
          />
        </FormGroup>

        {/* ----------- Reference ----------- */}
        <FormGroup
          label={<T id={'reference'} />}
          inline={true}
          className={classNames('form-group--reference', Classes.FILL)}
          intent={errors.reference && touched.reference && Intent.DANGER}
          helperText={
            <ErrorMessage name="reference" {...{ errors, touched }} />
          }
        >
          <InputGroup
            intent={errors.reference && touched.reference && Intent.DANGER}
            minimal={true}
            {...getFieldProps('reference')}
          />
        </FormGroup>
      </div>
    </div>
  );
}

export default compose(
  withCustomers(({ customers }) => ({
    customers,
  })),
  withDialogActions,
)(EstimateFormHeader);
