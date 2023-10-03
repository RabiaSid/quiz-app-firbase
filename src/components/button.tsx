type propsType = {
  label: string;
  onClick?: any;
  disabled?: any;
};

export default function Button(props: propsType) {
  const { label, onClick, disabled } = props;
  return (
    <button
      onClick={onClick}
      className=" bg-teal-700 p-2 text-white px-8 w-[100%] my-1"
      disabled={disabled}
    >
      {label}
    </button>
  );
}
