import styles from "./index.module.scss"

import {
  reviews1,
  reviews2,
  reviews3,
  reviews4,
  reviews5,
} from "../../../assets";


type CustomersExperienceProps = {
  ratings: { stars: number; percent: number }[];
  totalReviews: number;
};

export default function CustomersExperience({ ratings, totalReviews }: CustomersExperienceProps) {
  return (
    <div style={{ marginBottom: 60 }}>
      <h2 className="h2" style={{ marginBottom: 24 }}>Customers Experience</h2>
      <div style={{ display: "flex", gap: 27, justifyContent: "space-between" }}>
        <div className={styles['avatar-container']}>
          <p>Seamless interactions that delight at every touchpoint.</p>

          <div style={{ display: "flex", gap: 249 }}>
            <div className="review-avatars">
              {[reviews1, reviews2, reviews3, reviews4, reviews5].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`review-${i}`}
                  className="review-avatar"
                  style={{ left: `${i * 40}px` }}
                />
              ))}
            </div>
            <p style={{ marginTop: 12 }}>{totalReviews} reviews</p>
          </div>
        </div>

        <div className={styles['ratings-container']}>
          {ratings.map((rating) => (
            <div key={rating.stars} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className={styles['progress-bar-background']}>
                <div
                  className={styles['progress-bar-fill']}
                  style={{ width: `${rating.percent}%` }}
                />
              </div>

              <div style={{ display: "flex", gap: 2, minWidth: 72 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < rating.stars ? "#FFD700" : "#ccc",
                      fontSize: 14,
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <span style={{ width: 40, textAlign: "right" }}>{rating.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

