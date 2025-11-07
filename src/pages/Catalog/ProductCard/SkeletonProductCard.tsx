export default function SkeletonProductCard() {
    return (
        <div className="skeleton-card product-card">
            <div className="skeleton-image shimmer" />
            <div className="skeleton-info">
                <div className="skeleton-line short shimmer" />
                <div className="skeleton-line long shimmer" />
                <div className="skeleton-line short shimmer" />
            </div>
        </div>
    );
}
