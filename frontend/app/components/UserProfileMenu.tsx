import { Avatar, Box, DropdownMenu, Text } from "@radix-ui/themes";
import Link from "next/link";

import useFetchUser from "@/app/hooks/auth/useFetchUser";
import Spinner from "@/app/components/Spinner";

const UserProfileMenu = () => {
  const { data: user, isPending, error } = useFetchUser();
  if (isPending) {
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
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              <Spinner />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    );
  }
  if (error) {
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
          <DropdownMenu.Content>
            <Text>Error occurred</Text>
            <DropdownMenu.Item>
              <Link href="/auth/login">Log In</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    );
  }
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
        <DropdownMenu.Content>
          {user ? (
            <Box className="justify-center">
              <DropdownMenu.Label>
                <Text size="2">{user?.email}</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item className="justify-center">
                <Link href="/auth/logout">Log out</Link>
              </DropdownMenu.Item>
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
