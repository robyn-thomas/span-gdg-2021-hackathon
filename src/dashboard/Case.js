import { useCallback } from 'react';
import { validateEmail } from '../utils/helpers';
import { Link } from 'react-router-dom';
export default function Case(props) {
  const { link = 'https://twitter.com' } = props;
  const isEmail = validateEmail(link);

  const reportButton = () => {
    let linkComponent = '';
    if (isEmail) {
      linkComponent = (
        <Link
          to="#"
          onClick={(e) => {
            window.location = `mailto:${link}`;
            e.preventDefault();
          }}
        >
          Report
        </Link>
      );
    } else {
      linkComponent = (
        <Link
          to="#"
          onClick={(e) => {
            window.open(link, '_blank');
            e.preventDefault();
          }}
        >
          Report
        </Link>
      );
    }
    return (
      <button
        type="button"
        className=" h-10 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {linkComponent}
      </button>
    );
  };

  const getDetails = () => {
    return (
      <div className={'flex flex-col content-start'}>
        <b>Link:</b> {props.data.link} <b>Status:</b>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {props.data.status}
        </span>
      </div>
    );
  };
  const getActions = () => {
    return (
      <div className={'button-wrapper flex space-between w-62 space-x-3 md:space-x-6'}>
        <button
          type="button"
          className=" h-10 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Ignore
        </button>
        {reportButton()}
      </div>
    );
  };
  return (
    <li
      key={props.link}
      className="bg-white shadow overflow-hidden px-4 py-4 sm:px-4 sm:rounded-md md: h-20"
    >
      <div className={'flex justify-between'}>
        {getDetails()}
        {getActions()}
      </div>
    </li>
  );
}
