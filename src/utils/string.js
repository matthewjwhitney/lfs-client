export function getInitials(string) {
  var initials = string.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
  return initials.join("").toUpperCase();
}

export function camelCaseToTitle(string) {
  const title = string
  .replace(/([A-Z])/g, ' $1')
  .replace(/^./, function(str){ return str.toUpperCase(); });
  return title;
}