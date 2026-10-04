import React, { useState } from "react";
import { X, UserPlus } from "lucide-react";

const accountTypes = [
  { value: "customer", label: "Customer" },
  { value: "beautician", label: "Beautician / stylist" },
  { value: "shop_owner", label: "Beauty shop owner" }
];

export default function AccountModal({ onSubmit, onClose }) {
  const [mode, setMode] = useState("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit({
        name,
        email,
        password,
        role,
        mode
      });
    } catch (submitError) {
      setError(submitError.message || "We couldn't complete that request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setError("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section
        className="modal-content account-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close account form">
          <X size={18} />
        </button>

        <div className="account-modal-heading">
          <span className="account-modal-icon"><UserPlus size={21} /></span>
          <div>
            <h2 id="account-modal-title">{mode === "register" ? "Create your Glow account" : "Welcome back"}</h2>
            <p>{mode === "register" ? "Join Glow to book, discover, and share." : "Sign in to your Glow account."}</p>
          </div>
        </div>

        <form className="account-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <label>
                Your name
                <input
                  autoComplete="name"
                  maxLength={80}
                  minLength={2}
                  onChange={(event) => setName(event.target.value)}
                  required
                  value={name}
                />
              </label>
              <label>
                I am joining as
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                  {accountTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </label>
            </>
          )}

          <label>
            Email address
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            Password
            <input
              autoComplete={mode === "register" ? "new-password" : "current-password"}
              minLength={mode === "register" ? 8 : undefined}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
            {mode === "register" && <span className="account-form-hint">Use at least 8 characters.</span>}
          </label>

          {error && <p className="account-form-error" role="alert">{error}</p>}

          <button className="btn-primary btn-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Please wait..." : mode === "register" ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="account-mode-toggle">
          {mode === "register" ? "Already have an account?" : "New to Glow?"}{" "}
          <button type="button" onClick={() => changeMode(mode === "register" ? "login" : "register")}>
            {mode === "register" ? "Sign in" : "Create an account"}
          </button>
        </p>
      </section>
    </div>
  );
}
