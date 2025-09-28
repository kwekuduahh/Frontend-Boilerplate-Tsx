import React from 'react';

// Type definitions
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt?: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({
    src,
    alt = "Image Name",
    className = "",
    ...props
}) => {
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
        const target = e.target as HTMLImageElement;
        target.src = "/assets/images/no_image.png";
    };

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={handleError}
            {...props}
        />
    );
};

export default Image;