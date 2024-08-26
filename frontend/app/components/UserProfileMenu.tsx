import { Avatar, Box, Button, DropdownMenu, Text } from "@radix-ui/themes";
import Link from "next/link";
import useLogout from "@/app/hooks/auth/useLogout";
import useAuthStore from "@/app/store";

const UserProfileMenu = () => {
  const { user, logout, isAuthenticated } = useAuthStore();

  const { mutate, isPending } = useLogout();

  const onLogout = () => {
    logout();
    mutate();
  };

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Text>
            <Avatar
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
            />
          </Text>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="text-center">
          {isAuthenticated && user ? (
            <Box>
              <DropdownMenu.Label>
                <Text size="2">{user?.email}</Text>
              </DropdownMenu.Label>

              <Button className="wide-button " onClick={onLogout}>
                Log out
              </Button>
            </Box>
          ) : (
            <DropdownMenu.Item className="justify-center">
              <Link href="/auth/login">Log In</Link>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default UserProfileMenu;
