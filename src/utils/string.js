export function getInitials(string) {
  var initials = string.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
  return initials.join("").toUpperCase();
}
