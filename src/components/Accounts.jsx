import { useCallback, useState } from 'react';
import AccountItem from './AccountItem';
import { addProfile } from '../services/piii'
const AccountInfo = (props) => {
  const [display, setDisplay] = useState(false);
  const [twitter, setTwitter] = useState('')
  useCallback(
    (e) => {
      e.preventDefault();
      setDisplay(!display);
    },
    [display]
  );
  const hasAccounts = props.userData.account && props.userData.account.length;

  return (
    <div>
      <div>
        <h3 className="text-3xl leading-6 font-medium mt-12 text-gray-900">
          Applicant Information
        </h3>
        <p className="mt-1 max-w-2xl text-md text-gray-500 mt-8">Linked accounts</p>
      </div>

      <p className={'mt-1 max-w-2xl text-md text-gray-500 mt-2'}>
        {!hasAccounts ? (
          <div>No accounts linked add an account</div>
        ) : (
          props.userData.account.map((acc) => <AccountItem accountItem={acc} />)
        )}
      </p>
      <div className="space-y-6 sm:space-y-5">
        <form className={'mt-8 w-2/4'}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Account Url
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="account"
                id="account"
                onChange={x => setTwitter(x.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Account url"
              />
            </div>
            <div className="mt-1">
              <button
                onClick={x => addProfile(props.userData.uid, twitter)}
                className={
                  'whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                }
              >
                Add Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AccountInfo;
