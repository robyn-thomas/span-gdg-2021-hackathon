import { useCallback, useState } from 'react';
import AccountItem from './AccountItem';
const AccountInfo = (props) => {
  const [display, setDisplay] = useState(false);
  const onAddClick = useCallback((e) => {
    e.preventDefault();
    setDisplay(!display);
  }, [display]);
  if (!props.userData.account) {
    return null;
  }
  const hasAccounts = props.userData.account.length;

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
      <form>
        <input value={'test'}/>
        <div
          onclick={onAddClick}
          className="cursor-pointer whitespace-nowrap mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
           
          Add Account
        </div>
      </form>
      {/* */}
    </div>
  );
};
export default AccountInfo;
