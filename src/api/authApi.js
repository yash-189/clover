import { apiRequest } from "./client";
import { API_ENDPOINTS } from "../config/api";

async function submitAuthRequest(url, payload) {
  if (!url) {
    throw new Error("Missing API endpoint configuration.");
  }

  const data = await apiRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!data.success) {
    throw new Error(data.message || "Request failed. Please try again.");
  }

  return data;
}

export async function loginUser(values) {
  const data = await submitAuthRequest(API_ENDPOINTS.login, {
    email: values.email,
    password: values.password,
  });

  return data.token;
}

export async function registerUser(values) {
  const data = await submitAuthRequest(API_ENDPOINTS.register, {
    name: values.name,
    email: values.email,
    password: values.password,
    password2: values.password2,
  });

  return data.authtoken;
}
