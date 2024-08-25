def activate_user(backend, user=None, *args, **kwargs):
    if user:
        user.is_active = True
        user.save()
