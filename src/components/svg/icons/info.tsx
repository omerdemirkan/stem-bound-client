const InfoSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M9 18C13.9702 18 18 13.9702 18 9C18 4.02975 13.9702 0 9 0C4.02975 0 0 4.02975 0 9C0 13.9702 4.02975 18 9 18ZM9.75 13.5H8.25V7.5H9.75V13.5ZM9 4.3125C9.5175 4.3125 9.9375 4.7325 9.9375 5.25C9.9375 5.7675 9.5175 6.1875 9 6.1875C8.4825 6.1875 8.0625 5.7675 8.0625 5.25C8.0625 4.7325 8.4825 4.3125 9 4.3125Z"
            fill="#333333"
        />
    </svg>
);

export default InfoSVG;
