import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img
            src={img}
            alt='error'
            style={{
                display: 'block',
                width: '250px',
                height: '250px',
                objectFit: 'contain',
                margin: '20px auto',
                mixBlendMode: 'darken',
            }}
        />
    );
};

export default ErrorMessage;
