import type { Review } from "../../types/Products";
import { star } from "../../assets";

import "./index.scss";

type Props = {
  review: Review;
  showExtraInfo?: boolean;
};

export default function ReviewCard({ review, showExtraInfo = false }: Props) {
  return (
    <div className="review-card">
      <div
        style={{ display: "flex", justifyContent: "space-between", }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <img
            src={review.avatar}
            alt="avatar"
            className="review-avatar-large"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              justifyContent: "center",
            }}
          >
            <p className="h3">{review.name}</p>
            <p className="subtitle">Client</p>
          </div>
        </div>

        <div className="review-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <img
              key={i}
              src={star}
              alt="star"
              className={i < review.rating ? "star active" : "star"}
            />
          ))}
        </div>
      </div>

      <p className="body review-text">"{review.text}"</p>

      {showExtraInfo && (
        <div className="review-extra">
          {Array.isArray(review.image) && review.image.length > 0 && (
            <img
              src={review.image[0]}
              alt="review"
              className="review-image"
            />
          )}
          <p className="body review-date">{review.createdAt}</p>
        </div>
      )}

    </div>
  );
}
