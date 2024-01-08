import { useState } from "react";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "5px 10px",
    fontSize: "10px",
    cursor: "pointer",
  };

  const inputStyle = {
    marginBottom: "50px",
    padding: "6px",
    fontSize: "16px",
    backgroundColor: "white",
    color: "black",
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.length < 8 || password.length < 8) {
        setError("Username and password must be at least 8 characters long.");
        return;
      }

    try {
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        const result = await response.json();
        console.log(result);
        if (result.token) {
            setToken(result.token)
        } else {
            setError("Token not found in response")
        }
            
      } catch (error) {
        console.error("Error submitting form:", error);
        setError("An error occurred during submission");
      }
    }

  return (
    <>
       <h2 style={{ textAlign: "center" }}>Sign Up</h2>
       {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
          style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
          style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button style={buttonStyle}>Submit</button>
      </form>
    </>
  );
}
