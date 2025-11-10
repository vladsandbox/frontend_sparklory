import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./index.module.scss";

type Props = {
    formik: any;
    isLoading: boolean
};

export default function StepEmailForm({ formik, isLoading }: Props) {
    return (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
            <h1 className="h1">Reset Password</h1>
            <p className="body">
                Please enter your registered email address to receive a link to reset your password
            </p>
            <Input
                label="Email"
                labelClassName="text-s"
                placeholder="Enter your E-mail"
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!(formik.touched.email && formik.errors.email)}
                errorMessage={formik.errors.email}
            />
            <Button
                type="submit"
                disabled={!formik.isValid}
                style={{ width: "100%", marginTop: "20px" }}
                isLoading={isLoading}
            >
                Send
            </Button>
        </form>
    );
}