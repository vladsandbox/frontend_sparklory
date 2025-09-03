type Props = {
    data: string;
    signature: string;
};

export default function LiqPayCheckout({ data, signature }: Props) {
    return (
        <form method="POST" action="https://www.liqpay.ua/api/3/checkout" acceptCharset="utf-8">
            <input type="hidden" name="data" value={data} />
            <input type="hidden" name="signature" value={signature} />
            <button type="submit" className="primary-btn big button-text">
                Pay with LiqPay
            </button>
        </form>
    );
}