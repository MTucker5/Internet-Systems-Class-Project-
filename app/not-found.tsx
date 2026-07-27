export default function NotFound() {
  return (
    <div className="error-wrapper">
      <h2>404 — Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a href="/">
        <button className="add-btn">Go Home</button>
      </a>
    </div>
  );
}
