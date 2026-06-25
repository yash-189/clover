import React from "react";
import Button from "./Button";

const StatusMessage = ({ title, message, actionLabel, onAction, error = false }) => {
  return (
    <div className={`status-message ${error ? "status-message--error" : ""} d-flex flex-column align-items-center justify-content-center text-center p-4`}>
      <h3 className="status-message__title">{title}</h3>
      <p className="status-message__text mb-3">{message}</p>
      {actionLabel && onAction ? (
        <Button name={actionLabel} variant="outline" width="120px" onClick={onAction} />
      ) : null}
    </div>
  );
};

export default StatusMessage;
