import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'

import Buttons from './Buttons'
import Errors from 'ehrSrc/components/common/Errors'
import * as patientActions from 'ehrSrc/actions/patient'
import formValidators from 'ehrSrc/utils/validators/patientInfoForm'

import styles from './style.scss'

export class PatientInfoForm extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    patientItem: PropTypes.object,
    isNew: PropTypes.bool,
    formValues: PropTypes.object,
    isEditPatientInfoForm: PropTypes.bool,
    isPending: PropTypes.bool,
    onSubmit: PropTypes.func,
    onAddPhoneClick: PropTypes.func,
    onAddEmailClick: PropTypes.func,
  }

  render () {
    const { patientItem, isNew, formValues, isEditPatientInfoForm, isPending, onSubmit, onAddPhoneClick, onAddEmailClick } = this.props
    const disabled = !isEditPatientInfoForm || isPending
    const patientId = patientItem && patientItem.id

    return (
      <Form className={cn(styles.patientInfoForm, this.props.className)} validators={formValidators(formValues)} model='rrf.patientInfoForm' onSubmit={onSubmit} autoComplete='off'>
        <div className={cn(styles.formGroup)}>
          <label>
            <span className={cn(styles.left)}>Имя *</span>
            <span className={cn(styles.right)}>
              <Control type='text' model='.firstName' disabled={disabled} />
              <Errors
                model='.firstName'
                messages={{
                  isRequired: 'Обязательно для заполнения'
                }}
              />
            </span>
          </label>
        </div>
        <div className={cn(styles.formGroup)}>
          <label>
            <span className={cn(styles.left)}>Фамилия *</span>
            <span className={cn(styles.right)}>
              <Control type='text' model='.lastName' disabled={disabled} />
              <Errors
                model='.lastName'
                messages={{
                  isRequired: 'Обязательно для заполнения'
                }}
              />
            </span>
          </label>
        </div>
        <div className={cn(styles.formGroup)}>
          <label>
            <span className={cn(styles.left)}>Пол</span>
            <span className={cn(styles.right)}>
              <Control.select model='.gender' disabled={disabled}>
                <option value=''> — </option>
                <option value='male'>Мужской</option>
                <option value='female'>Женский</option>
              </Control.select>
            </span>
          </label>
        </div>
        <div className={cn(styles.formGroup)}>
          <label>
            <span className={cn(styles.left)}>Дата рождения</span>
            <span className={cn(styles.right)}>
              <Control type='text' model='.birthDate' disabled={disabled} />
              <Errors
                model='.birthDate'
                messages={{
                  isDate: 'Неверный формат даты (ГГГГ-ММ-ДД)'
                }}
              />
            </span>
          </label>
        </div>
        <div className={cn(styles.formGroup)}>
          <div className={cn(styles.left)}>
            Улица, дом, квартира *
          </div>
          <div className={cn(styles.right)}>
            <Control type='text' model='.address.line.0' disabled={disabled} placeholder='Улица, дом, квартира' />
            <Errors
              model='.address.line.0'
              messages={{
                isRequired: 'Обязательно для заполнения'
              }}
            />
            <Control type='text' model='.address.line.1' disabled={disabled} placeholder='Квартира, блок и т.п. (при необходимости)' />
          </div>
        </div>
        <div className={cn(styles.formGroup)}>
          <label>
            <span className={cn(styles.left)}>Край/Область/Регион</span>
            <span className={cn(styles.right)}>
              <Control type='text' model='.address.state' disabled={disabled} />
            </span>
          </label>
        </div>
        <div className={cn(styles.formGroup)}>
          <label>
            <span className={cn(styles.left)}>Город *</span>
            <span className={cn(styles.right)}>
              <Control type='text' model='.address.city' disabled={disabled} />
              <Errors
                model='.address.city'
                messages={{
                  isRequired: 'Обязательно для заполнения'
                }}
              />
            </span>
          </label>
        </div>
        <div className={cn(styles.formGroup)}>
          <label>
            <span className={cn(styles.left)}>Почтовый индекс</span>
            <span className={cn(styles.right)}>
              <Control type='text' model='.address.postalCode' disabled={disabled} />
              <Errors
                model='.address.postalCode'
                messages={{
                  isPostalCode: 'Неверный почтовый индекс',
                }}
              />
            </span>
          </label>
        </div>
        <div className={cn(styles.formGroup)}>
          <label>
            <span className={cn(styles.left)}>Водительское удостоверение</span>
            <span className={cn(styles.right)}>
              <Control type='text' model='.identifier' disabled={disabled} />
            </span>
          </label>
        </div>
        <div className={cn(styles.formGroup)}>
          <div className={cn(styles.left)}>
            Телефон
          </div>
          <div className={cn(styles.right)}>
            {
              formValues.phone.map(function (item, i) {
                return (
                  <React.Fragment key={i}>
                    <Control key={i} type='text' model={`.phone.${i}`} disabled={disabled} />
                    <Errors
                      model={`.phone.${i}`}
                      messages={{
                        isNumeric: 'Допустимы только цифры'
                      }}
                    />
                  </React.Fragment>
                )
              })
            }
            <button type='button' onClick={onAddPhoneClick} disabled={disabled}>Добавить</button>
          </div>
        </div>
        <div className={cn(styles.formGroup)}>
          <div className={cn(styles.left)}>
            Email
          </div>
          <div className={cn(styles.right)}>
            {
              formValues.email.map(function (item, i) {
                return (
                  <React.Fragment key={i}>
                    <Control type='text' model={`.email.${i}`} disabled={disabled} />
                    <Errors
                      model={`.email.${i}`}
                      messages={{
                        isEmail: 'Не верный электронный адрес'
                      }}
                    />
                  </React.Fragment>
                )
              })
            }
            <button type='button' onClick={onAddEmailClick} disabled={disabled}>Добавить</button>
          </div>
        </div>
        <Buttons patientId={patientId} isNew={isNew} />
      </Form>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    formValues: state.rrf.patientInfoForm,
    formProps: state.rrf.forms.patientInfoForm,
    isEditPatientInfoForm: state.rrf.isEditPatientInfoForm,
    isPending: !!state.api.pending.API_PUT_PATIENT || !!state.api.pending.API_POST_PATIENT || !!state.api.pending.API_DELETE_PATIENT,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  const { patientItem, isNew } = ownProps
  const patientId = patientItem && patientItem.id

  return {
    onSubmit: function (values) {
      return dispatch(patientActions.submitPatientInfoForm({ ...values, id: patientId }, isNew))
    },
    onAddPhoneClick: function (values) {
      return dispatch(patientActions.addPhonePatientInfoForm())
    },
    onAddEmailClick: function (values) {
      return dispatch(patientActions.addEmailPatientInfoForm())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientInfoForm)
