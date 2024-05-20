'use client';

function LoadingSpinner() {
  //
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="mr-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#481500] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-slate-200"
        role="status"
      ></div>
    </div>
  );
}

export default LoadingSpinner;
