import React from "react";
import { Select } from "@radix-ui/themes";
import useFetchUsers from "@/app/hooks/auth/useFetchUsers";
import Skeleton from "@/app/components/Skeleton";
import useUpdateIssue from "@/app/hooks/issues/useUpdateIssue";
import { Issue } from "@/app/entities/Issue";
import { toast } from "react-toastify";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isPending, error } = useFetchUsers();
  const { updateIssue } = useUpdateIssue(issue.id);

  if (isPending) return <Skeleton height="2rem" />;

  if (error) {
    toast.error("Changes could not be saved");
  }
  const handleValueChange = (user: null | string) => {
    if (user === "unassigned") {
      const user = null;
      updateIssue({ user });
    } else {
      updateIssue({ user });
    }
  };

  return (
    <Select.Root onValueChange={handleValueChange}>
      <Select.Trigger
        placeholder={issue.user ? String(issue.user) : "Unassigned"}
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={String(user.id)}>
              {user.email}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
