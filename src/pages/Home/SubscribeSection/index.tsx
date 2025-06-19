import { subscribeImg } from '../../../assets/'

import styles from "./index.module.scss";

export default function SubscribeSection() {
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
                        <input type="text" className={`primary-input input ${styles.input}`} placeholder="Write your E-mail" />
                        <button className={`primary-btn big button-text ${styles.button}`}>Subscribe</button>
                    </div>
                </div>

                <div className={styles.imageContainer}>
                    <img src={subscribeImg} alt="subscribeImg" />
                </div>
            </div>
        </div>
    );
}
