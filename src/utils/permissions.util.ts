const checkPerms = (
  user: any,
  permission: string,
  allowAdmin: boolean = false
): boolean => {
  if (!user || !user.permissions) return false;

  return (
    user.isOwner ||
    user.permissions.includes(permission) ||
    user.permissions.includes("owner") ||
    (allowAdmin && user.permissions.includes("administrator"))
  );
};

export default checkPerms;
