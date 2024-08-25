import initiateSocialAuth from "@/app/utils/initiateSocialAuth";

export const useGoogle = () => initiateSocialAuth("google-oauth2", "google");
