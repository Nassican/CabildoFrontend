import { TriangleAlertIcon } from 'lucide-react';
import React from 'react';

interface ErrorCustomProps {
  error: string;
}

const ErrorCustom: React.FC<ErrorCustomProps> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-md rounded-lg bg-red-100 p-8 text-center dark:bg-red-900">
        <div className="mb-4 flex items-center justify-center">
          <TriangleAlertIcon className="h-10 w-10 text-red-500 dark:text-red-400" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-red-900 dark:text-red-100">Oops, algo salió mal!</h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    </div>
  );
};

export default ErrorCustom;
