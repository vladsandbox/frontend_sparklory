import "./index.scss";

type Props = {
  percentage: number;
};

export default function DiscountLabel({ percentage }: Props) {
  const isCorrectNumber = percentage > 0 && percentage <= 100;

  return (
      <div className="discountLabel subtitle">{isCorrectNumber ? "-"+percentage+"%" : "Error"}</div>
  );
}
