import { useState } from 'react';
import { Formik } from 'formik';
import AccountItem from './AccountItem';
import { addProfile } from '../services/piii';
const AccountInfo = (props) => {
  const hasAccounts = props.userData.account && props.userData.account.length;

  return (
    <div className={'border-t-2 border-gray-100 pt-1'}>
      <div>
        <h3 className="text-3xl leading-6 font-medium mt-12 text-gray-900">
          Applicant Information
        </h3>
        <p className="mt-1 max-w-2xl text-md text-gray-500 mt-8">Linked accounts</p>
      </div>

      <p className={'mt-1 max-w-2xl text-md text-gray-500 mt-2'}>
        {!hasAccounts ? (
          <div className={'text-indigo-600'}>
            No accounts linked <b>add an account</b>
          </div>
        ) : (
          props.userData.account.map((acc) => <AccountItem accountItem={acc} />)
        )}
      </p>
      <div className="space-y-6 sm:space-y-5">
        <Formik
          initialValues={{ userAccount: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.userAccount) {
              errors.userAccount = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            addProfile(props.userData.uid, values.userAccount);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              noValidate
            >
              <input
                type="text"
                name="userAccount"
                id="account"
                value={values.userAccount}
                onBlur={handleBlur}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Account handle"
              />
              <div className={'text-red-400'}>
                {errors.userAccount && touched.userAccount && errors.userAccount}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={
                  'mt-4 cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                }
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      
      </div>
    </div>
  );
};
export default AccountInfo;
