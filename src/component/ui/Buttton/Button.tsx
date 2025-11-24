import styles from "./Button.module.css";

interface PropTypes {
  type?: "button" | "submit" | "reset";
  children: string;
  onClick?: () => void;
  className?: string;
  color?: "primary" | "secondary" | "success" | "danger";
}

const Button = ({
  children,
  type = "button",
  onClick,
  className,
  color = "primary",
}: PropTypes) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[`button-${color}`]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
