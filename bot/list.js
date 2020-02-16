module.exports = (u, cmd, args) => {
  const role = u.getRole(args);
  if (!role) {
    u.w('cannot find the role specified!');
    return;
  }
  const members = u.getMembers(role.name);
  const list = members.map(
    (i, index) => 
      ((index + 1).toString().padStart(3))
      + '. '
      + 
      (
        i.displayName
        || `${i.user.username}#${i.user.discriminator}`
      )
  );
  u.w(`${role.name}:\n${list.join('\n')}`);
};
