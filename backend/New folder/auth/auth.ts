"use server"; // This designates the component as a Server Component

import { cookies } from "next/headers";

export default async function AuthCheck() {
  try {
    // 1. Get the cookies
    const cookieStore = cookies();
    const cookieHeader = cookieStore.toString();

    // 2. Make a request to your Django backend's /check/ endpoint
    const response = await fetch("http://127.0.0.1:8000/auth/check/", {
      credentials: "include", // Important for sending cookies
      headers: {
        Cookie: cookieHeader, // Forward cookies from the request
      },
    });
    console.log(response);

    if (response.status) {
      const data = await response.json();
      return data; // Return the authentication data
    } else {
      return { isAuthenticated: false };
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return { isAuthenticated: false };
  }
}
