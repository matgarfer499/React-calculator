export function SignButton({ onClick, value }) {

    return (
      <button onClick={onClick} className='w-[70px] h-[70px] text-white bg-[#f69906] rounded-full text-2xl mb-4 font-semibold m-auto' value={value}>
        {value}
      </button>
    );
  }
  
  export default SignButton;
  