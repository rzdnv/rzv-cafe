// import styles from "./Input.module.css";
// import { forwardRef } from "react";

// interface PropTypes extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   name: string;
//   id: string;
//   type?: string;
//   placeholder?: string;
//   required?: boolean;
//   className?: string;
// }

// const Input = forwardRef<HTMLInputElement, PropTypes>(
//   ({ label, className, name, id, type, placeholder, required }, ref) => {
//     return (
//       <label htmlFor={id} className={styles.label}>
//         {label}
//         <input
//           type={type}
//           id={id}
//           name={name}
//           ref={ref}
//           className={`${styles.input} ${className}`}
//           placeholder={placeholder}
//           required={required}
//         />
//       </label>
//     );
//   }
// );

// export default Input;

import styles from "./Input.module.css";
import { forwardRef } from "react";

interface PropTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  id: string;
}

const Input = forwardRef<HTMLInputElement, PropTypes>(
  ({ label, className, name, id, ...props }, ref) => {
    return (
      <label htmlFor={id} className={styles.label}>
        {label}
        <input
          id={id}
          name={name}
          {...props} // semua props diteruskan ke input (type, name, placeholder, required, dll)
          ref={ref} // ref dari React Hook Form
          className={`${styles.input} ${className || ""}`}
        />
      </label>
    );
  }
);

export default Input;
