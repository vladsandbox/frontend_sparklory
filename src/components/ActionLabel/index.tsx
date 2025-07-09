import HuobiToken from "@/assets/icons/huobi-token-(ht).svg?react";
import "./index.scss";

type Props = {
  action: string;
};

export default function ActionLabel({ action }: Props) {
  return (
      <div className="actionLabel">
        <HuobiToken /> {action}
      </div>
  );
}
