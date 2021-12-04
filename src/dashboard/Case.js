export default function Case(props) {
  return (
    <li
      key={props.link}
      className="bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md"
    >
      <div>
        <p>
          <b>Link:</b> {props.data.link} <b>Status:</b> {props.data.status}
        </p>
      </div>
    </li>
  );
}
