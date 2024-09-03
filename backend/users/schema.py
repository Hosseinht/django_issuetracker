from drf_spectacular.openapi import AutoSchema


class CustomAutoSchema(AutoSchema):
    def get_description(self):
        # Customize the description based on the path and method
        if self.path == "/auth/users/" and self.method.lower() == "get":
            return "Get the list of users."
        elif self.path == "/auth/users/" and self.method.lower() == "post":
            return "Create a new user."
        # Add more customizations as needed
        return super().get_description()

    def get_tags(self):
        action = getattr(self.view, "action", None)
        if action in [
            "list",
            "create",
            "retrieve",
            "update",
            "partial_update",
            "destroy",
        ]:
            return ["Authentication - Users"]
        elif action == "activation":
            return ["Authentication - Activation"]
        elif action in ["reset_password", "reset_password_confirm", "set_password"]:
            return ["Authentication - Reset Password"]
        elif action == "me":
            return ["Authentication - User Profile"]
        elif action == "resend_activation":
            return ["Authentication - Activation"]
        else:
            return super().get_tags()
