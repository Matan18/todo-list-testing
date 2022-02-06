import styles from "./styles.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  title: string;
};

export const Input = ({ title, ...props }: Props) => (
  <fieldset
    className={styles.container}
    data-type={props.type}
  >
    <legend>{title}</legend>
    <input {...props} />
  </fieldset>
);
