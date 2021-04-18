export function makeUsersQuery(follows: any): string {
  const prefix = "?id=";
  let params = "";
  for (const follow of follows.values()) {
    const id = follow.value.to_id;
    let trail = params.length > 0 ? `&id=${id}` : id;
    params += trail;
  }
  return prefix + params;
}

export function trimAndLower(str: string) {
  return str.replace(/ /g, "").toLowerCase();
}
