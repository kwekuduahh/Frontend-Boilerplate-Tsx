import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/_Shared/Components/Ui/button';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
            <div className="max-w-md text-center">
                <div className="flex justify-center mb-6">
                    {/* <div className="relative">
                        <h1 className="font-bold text-9xl text-primary opacity-20">404</h1>
                    </div> */}
                    <div className="flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="72px" height="72px" viewBox="0 0 32 33" fill="none">
                            <path d="M16 28.5C22.6274 28.5 28 23.1274 28 16.5C28 9.87258 22.6274 4.5 16 4.5C9.37258 4.5 4 9.87258 4 16.5C4 23.1274 9.37258 28.5 16 28.5Z" stroke="#343330" strokeWidth="2" strokeMiterlimit="10" />
                            <path d="M11.5 15.5C12.3284 15.5 13 14.8284 13 14C13 13.1716 12.3284 12.5 11.5 12.5C10.6716 12.5 10 13.1716 10 14C10 14.8284 10.6716 15.5 11.5 15.5Z" fill="#343330" />
                            <path d="M20.5 15.5C21.3284 15.5 22 14.8284 22 14C22 13.1716 21.3284 12.5 20.5 12.5C19.6716 12.5 19 13.1716 19 14C19 14.8284 19.6716 15.5 20.5 15.5Z" fill="#343330" />
                            <path d="M21 22.5C19.9625 20.7062 18.2213 19.5 16 19.5C13.7787 19.5 12.0375 20.7062 11 22.5" stroke="#343330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                <h2 className="mb-2 text-2xl font-medium text-onBackground">Page Not Found</h2>
                <p className="mb-8 text-onBackground/70">
                    The page you're looking for doesn't exist. Let's get you back!
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Button
                        variant="default"
                        onClick={() => window.history?.back()}
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </Button>

                    <Button
                        variant="outline"
                        onClick={handleGoHome}
                    >
                        <Home size={18} />
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
