// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import moment from 'moment'
// eslint-disable-next-line no-unused-vars
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import fr from 'date-fns/locale/fr'

import '../scss/react-datepicker/datepicker.scss'
registerLocale('fr', fr)

// eslint-disable-next-line
const DatePickerFilter = (props) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)

  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <div className="px-5">
      <div className="row gx-3 align-items-center mb-8">
        <div className="col">
          <input className="form-control px-4 rounded-pill bg-dark-highlight text-white" type="text" value={moment(startDate).format('DD.MM.YYYY')}/>
        </div>
        <div className="col-auto">
          <svg className="svg-icon" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.3094 9.50706L12.9026 17.7563C12.7553 17.9203 12.5142 18 12.3535 18C12.1755 18 11.9968 17.9356 11.8552 17.8052C11.5528 17.5269 11.5304 17.0525 11.8053 16.7464L18.086 9.75078H1.24068C0.831228 9.75078 0.5 9.41542 0.5 9.04304C0.5 8.67065 0.831317 8.25093 1.24068 8.25093H18.0856L11.8039 1.25315C11.529 0.947042 11.5514 0.472291 11.8538 0.194348C12.1569 -0.0824691 12.6248 -0.0619866 12.9007 0.245625L20.3075 8.49484C20.5639 8.78056 20.5639 9.22115 20.3094 9.50706Z" fill="white"/>
          </svg>
        </div>
        <div className="col">
          <input className="form-control px-4 rounded-pill bg-dark-highlight text-white" type="text" value={moment(endDate).format('DD.MM.YYYY')}/>
        </div>
      </div>

      <DatePicker
        locale="fr"
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        monthsShown={2}
      />
    </div>
  )
}

export default DatePickerFilter
