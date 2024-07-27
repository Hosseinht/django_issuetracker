import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import useDeleteIssue from "@/app/hooks/useDeleteIssue";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const deleteIssue = useDeleteIssue(issueId);
  const handleSubmit = () => {
    deleteIssue.mutate();
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={handleSubmit}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
