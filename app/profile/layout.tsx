import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";
import ProfileLayoutComponent from "@/components/ProfileLayout";

export default async function ProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const user = await AuthGetCurrentUserServer();

  return (
    <ProfileLayoutComponent user={user}>{children}</ProfileLayoutComponent>
  );
}
