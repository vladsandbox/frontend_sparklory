import Button from "@/components/Button";
import styles from "./index.module.scss";

type Props = {
  onResend: () => void;
  isLoading: boolean;
};

export default function StepEmailSent({ onResend , isLoading }: Props) {
  return (
    <div className={styles.form}>
      <h1 className="h1">Password Resend</h1>
      <p className="body">
        We’ve sent you an email with a link to reset your password. It may take a few minutes to arrive.
        Don’t forget to check your spam folder.
      </p>
      <Button onClick={onResend} style={{ width: "100%" }} isLoading={isLoading}>
        Resend
      </Button>
    </div>
  );
}