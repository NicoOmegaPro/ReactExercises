export default function More({ onClick, label }) {
    return (
        <section className="morebar" aria-label="Load more">
            <button
                className="morebar__btn"
                type="button"
                style={{ minWidth: "180px", letterSpacing: "0.4px" }}
                onClick={onClick}>
                {label}
            </button>
        </section>
    );
}