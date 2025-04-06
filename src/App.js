import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  encryptAES,
  decryptAES,
  encryptDES,
  decryptDES,
  encryptRSA,
  decryptRSA,
  RSA_KEYS,
} from "./encryptionUtils";

function App() {
  const [inputText, setInputText] = useState("");
  const [algorithm, setAlgorithm] = useState("AES");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const handleEncrypt = () => {
    let result = "";
    if (algorithm === "AES") result = encryptAES(inputText);
    else if (algorithm === "DES") result = encryptDES(inputText);
    else if (algorithm === "RSA") result = encryptRSA(inputText);
    setEncryptedText(result);
    setDecryptedText("");
  };

  const handleDecrypt = () => {
    let result = "";
    if (algorithm === "AES") result = decryptAES(encryptedText);
    else if (algorithm === "DES") result = decryptDES(encryptedText);
    else if (algorithm === "RSA") result = decryptRSA(encryptedText);
    setDecryptedText(result);
  };

  const handleClear = () => {
    setInputText("");
    setEncryptedText("");
    setDecryptedText("");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🔐 Text Encryption Tool</h2>

      <div className="mb-3">
        <label className="form-label">Select Algorithm</label>
        <select
          className="form-select"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="AES">AES</option>
          <option value="DES">DES</option>
          <option value="RSA">RSA (🗝️ Public/Private Key)</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Enter Text</label>
        <textarea
          className="form-control"
          rows="3"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2 mb-4">
        <button className="btn btn-primary" onClick={handleEncrypt}>
          🔐 Encrypt
        </button>
        <button className="btn btn-success" onClick={handleDecrypt} disabled={!encryptedText}>
          🔓 Decrypt
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          🧹 Clear
        </button>
      </div>

      {encryptedText && (
        <div className="mb-3">
          <h5>🔒 Encrypted Text</h5>
          <pre className="bg-light p-2 rounded">{encryptedText}</pre>
          <small className="text-muted">
            This is the actual encrypted output using {algorithm}.
          </small>
        </div>
      )}

      {decryptedText && (
        <div className="mb-3">
          <h5>🔓 Decrypted Text</h5>
          <pre className="bg-light p-2 rounded">{decryptedText}</pre>
        </div>
      )}

      {algorithm === "RSA" && (
        <div className="mt-4">
          <h5>📜 RSA Keys</h5>
          <div className="mb-2">
            <strong>🔑 Public Key:</strong>
            <pre className="bg-light p-2 rounded">{RSA_KEYS.publicKey}</pre>
          </div>
          <div>
            <strong>🔐 Private Key:</strong>
            <pre className="bg-light p-2 rounded">{RSA_KEYS.privateKey}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
