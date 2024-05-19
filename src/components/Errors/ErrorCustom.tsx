import React from 'react';
import { TriangleAlertIcon } from 'lucide-react';


interface ErrorCustomProps {
    error: string;
}

const ErrorCustom: React.FC<ErrorCustomProps> = ({ error }) => {
    return (
        <div className="flex flex-col py-10 items-center justify-center">
            <div className="bg-red-100 dark:bg-red-900 rounded-lg p-8 text-center max-w-md w-full">
                <div className="flex items-center justify-center mb-4">
                    <TriangleAlertIcon className="h-10 w-10 text-red-500 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
                    Oops, algo salió mal!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            </div>
        </div>
    );
};

export default ErrorCustom;