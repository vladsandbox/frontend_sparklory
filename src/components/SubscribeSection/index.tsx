import { subscribeImg } from '@/assets'

import Button from "@/components/Button.tsx";
import styles from "./index.module.scss";

type Props = {
    imageSrc?: string
}

export default function SubscribeSection({ imageSrc = subscribeImg }: Props) {
    return (
        <div className={styles.subscribeWrapper}>
            <div className={`wrapper ${styles.inner}`}>
                <div className={styles.textBlock}>
                    <h1 className="h1 title">Join the world of Sparklory</h1>
                    <p className={`body ${styles.description}`}>
                        Become a member of our loyalty club and start earning bonuses — get 10% back in points from every purchase.
                    </p>
                    <p className={`body ${styles.description}`}>Stay in the loop with new arrivals and exclusive offers.</p>
                    <div className={styles.inputContainer}>
                        <input type="text" className="primary-input input" placeholder="Write your E-mail" />
                        <Button variant="primary" size="big" className="button-text">Subscribe</Button>
                    </div>
                </div>
                <div>
                    <img src={imageSrc} alt="subscribeImg" />
                </div>
            </div>
        </div>
    );
}
